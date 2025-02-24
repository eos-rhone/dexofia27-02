import { createClient } from '@supabase/supabase-js';
import type { Database } from './database.types';
import { parseSearchIntent, calculateRelevanceScore } from './utils';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Les variables d\'environnement Supabase sont manquantes. Assurez-vous d\'avoir configuré VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'dexofai'
    }
  },
  db: {
    schema: 'public'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Fonction utilitaire pour les retries
const withRetry = async <T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> => {
  let lastError;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      if (i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i) * (0.5 + Math.random());
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError;
};

// Fonction pour récupérer les catégories avec retry
export async function getCategories() {
  try {
    const { data, error } = await withRetry(async () => 
      await supabase
        .from('categories')
        .select('*')
        .order('name')
    );
    
    if (error) {
      console.error('Erreur Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories:', error);
    return [];
  }
}

// Fonction améliorée pour récupérer les outils avec recherche intelligente
export async function getTools(options: {
  category?: string;
  search?: string;
  limit?: number;
  featured?: boolean;
} = {}) {
  try {
    let query = supabase
      .from('ai_tools')
      .select(`
        *,
        category:categories(
          id,
          name,
          slug,
          icon
        )
      `);

    // Si une catégorie est spécifiée, filtrer par cette catégorie
    if (options.category) {
      query = query.eq('categories.slug', options.category);
    }

    // Si une recherche est spécifiée
    if (options.search) {
      // Analyser l'intention de recherche
      const searchIntent = parseSearchIntent(options.search);
      
      // Construire la requête de recherche
      const searchConditions = [];
      
      // Ajouter les conditions pour les mots-clés directs
      if (searchIntent.keywords.length > 0) {
        searchIntent.keywords.forEach(keyword => {
          searchConditions.push(`name.ilike.%${keyword}%`);
          searchConditions.push(`description.ilike.%${keyword}%`);
        });
      }
      
      // Si nous avons un sujet, ajouter des conditions spécifiques
      if (searchIntent.subject) {
        searchConditions.push(`description.ilike.%${searchIntent.subject}%`);
      }
      
      // Si nous avons une action, ajouter des conditions spécifiques
      if (searchIntent.action) {
        searchConditions.push(`description.ilike.%${searchIntent.action}%`);
      }
      
      // Si nous avons des conditions de recherche, les appliquer
      if (searchConditions.length > 0) {
        query = query.or(searchConditions.join(','));
      }
    }

    if (options.featured) {
      query = query.eq('is_featured', true);
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    // Exécuter la requête avec retry
    const { data, error } = await withRetry(async () => await query);
    
    if (error) {
      console.error('Erreur Supabase:', error.message);
      return [];
    }

    // Filtrer les résultats pour s'assurer que seuls les outils de la catégorie spécifiée sont retournés
    let filteredData = data;
    if (options.category) {
      filteredData = data.filter(tool => 
        tool.category?.slug === options.category
      );
    }

    // Si une recherche est effectuée, trier les résultats par pertinence
    if (options.search && filteredData) {
      const searchIntent = parseSearchIntent(options.search);
      return filteredData
        .map(tool => ({
          ...tool,
          relevanceScore: calculateRelevanceScore(tool, searchIntent)
        }))
        .sort((a, b) => b.relevanceScore - a.relevanceScore)
        .filter(tool => tool.relevanceScore > 0); // Ne retourner que les résultats pertinents
    }

    return filteredData || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des outils:', error);
    return [];
  }
}

// Fonction pour récupérer les détails d'un outil avec retry
export async function getToolDetails(slug: string) {
  try {
    const { data, error } = await withRetry(async () => 
      await supabase
        .from('ai_tools')
        .select(`
          *,
          category:categories(*),
          features:tool_features(*),
          pricing:tool_pricing(*),
          reviews:reviews(*)
        `)
        .eq('slug', slug)
        .single()
    );
    
    if (error) {
      console.error('Erreur Supabase:', error.message);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de l\'outil:', error);
    return null;
  }
}

// Fonction pour incrémenter les vues d'un outil avec retry
export async function incrementToolViews(toolId: string) {
  try {
    const { error } = await withRetry(async () => 
      await supabase.rpc('increment_tool_views', {
        tool_id: toolId
      })
    );
    
    if (error) {
      console.error('Erreur Supabase:', error.message);
    }
  } catch (error) {
    console.error('Erreur lors de l\'incrémentation des vues:', error);
  }
}

// Fonction pour soumettre un avis avec retry
export async function submitReview(toolId: string, rating: number, comment: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('L\'utilisateur doit être authentifié pour soumettre un avis');
    }

    const { error } = await withRetry(async () => 
      await supabase
        .from('reviews')
        .insert({
          tool_id: toolId,
          user_id: user.id,
          rating,
          comment
        })
    );
    
    if (error) {
      console.error('Erreur Supabase:', error.message);
      throw error;
    }
  } catch (error) {
    console.error('Erreur lors de la soumission de l\'avis:', error);
    throw error;
  }
}
