import React, { useState, useEffect } from 'react';
import { Icon } from '../components/Icon';
import { 
  Search, 
  Headphones, 
  LineChart, 
  Microscope, 
  Rocket, 
  FlaskConical, 
  CircuitBoard, 
  Briefcase, 
  Leaf, 
  Mountain, 
  Box as Cube, 
  Factory, 
  Truck, 
  Film, 
  Building, 
  Building2,
  Waves, 
  Pencil, 
  Dumbbell, 
  Folder,
  Brain,
  MessageSquare,
  Car,
  Music,
  Shield,
  Layout,
  Code,
  GraduationCap,
  Image,
  Home,
  Gamepad,
  Scale,
  Globe,
  Shirt,
  Camera,
  Zap,
  Glasses,
  Radio,
  Languages,
  Video,
  Mic2,
  Database,
  Heart,
  Bot,
  Users,
  ArrowUpRight,
  Beaker,
  Palette
} from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { getCategories, getTools } from '../lib/supabase';
import { AiBrain } from '../components/icons/AiBrain';
import { Acoustic } from '../components/icons/Acoustic';

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  tool_count: number;
  popularTools: {
    name: string;
    slug: string;
    website_url: string;
  }[];
}

const iconMap = {
  Headphones,
  LineChart,
  Microscope,
  Rocket,
  FlaskConical,
  CircuitBoard,
  Briefcase,
  Leaf,
  Mountain,
  Cube,
  Factory,
  Truck,
  Film,
  Building,
  Building2,
  Waves,
  Search,
  Pencil,
  Dumbbell,
  Folder,
  Brain,
  MessageSquare,
  Car,
  Flask: Beaker,
  Music,
  Shield,
  Layout,
  Code,
  GraduationCap,
  Image,
  Home,
  Gamepad,
  Scale,
  Globe,
  Shirt,
  Camera,
  Zap,
  Glasses,
  Radio,
  Languages,
  Video,
  Mic2,
  Database,
  Heart,
  Bot,
  Users,
  AiBrain: Brain,
  Acoustic: Music,
  Palette
};

export function Categories() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
  }, [location]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        setError(null);
        const categoriesData = await getCategories();
        
        const categoriesWithTools = await Promise.all(
          categoriesData.map(async (category) => {
            const tools = await getTools({ 
              category: category.slug,
            });
            
            const sortedTools = tools.sort((a, b) => b.monthly_users - a.monthly_users);
            
            const popularTools = sortedTools.slice(0, 4).map(tool => ({
              name: tool.name,
              slug: tool.slug,
              website_url: tool.website_url
            }));
            
            return {
              ...category,
              tool_count: tools.length,
              popularTools
            };
          })
        );
        
        setCategories(categoriesWithTools);
      } catch (error) {
        console.error('Error loading categories:', error);
        setError('Une erreur est survenue lors du chargement des catégories');
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Catégories
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Explorez notre catalogue d'outils d'intelligence artificielle par catégorie
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher une catégorie..."
              className="w-full pl-12 pr-4 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-8 text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <div
                key={category.slug}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4">
                  {(() => {
                    const IconComponent = iconMap[category.icon];
                    if (!IconComponent) {
                      console.warn(`Icône manquante pour ${category.name}: ${category.icon}`);
                      return <Icon icon={Folder} size={32} variant="primary" />;
                    }
                    return <Icon icon={IconComponent} size={32} variant="primary" />;
                  })()}
                </div>

                <RouterLink 
                  to={`/categories/${category.slug}`}
                  className="inline-block mb-2 hover:text-blue-500 transition-colors"
                >
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                </RouterLink>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {category.popularTools.map((tool) => (
                    <a
                      key={tool.slug}
                      href={tool.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400 hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 flex items-center gap-1"
                    >
                      {tool.name}
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ))}
                </div>

                <div className="text-sm text-gray-500">
                  {category.tool_count} outils
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
