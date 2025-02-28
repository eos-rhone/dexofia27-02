import React, { useState, useCallback, useEffect } from 'react';
import { Search, Brain, TrendingUp, Bot, Database, Star, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getTools, getCategories } from '../lib/supabase';
import GlowingShapes from '../components/GlowingShapes';

export function Home() {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [stats, setStats] = useState({
    toolCount: 0,
    categoryCount: 0,
    monthlyUsers: 0,
    averageRating: 0
  });
  const navigate = useNavigate();

  // Charger les statistiques au montage du composant
  useEffect(() => {
    async function loadStats() {
      try {
        // Récupérer tous les outils et catégories
        const [tools, categories] = await Promise.all([
          getTools(),
          getCategories()
        ]);

        // Calculer les statistiques
        const totalTools = tools.length;
        const totalCategories = categories.length;
        const totalMonthlyUsers = tools.reduce((sum, tool) => sum + (tool.monthly_users || 0), 0);
        const avgRating = tools.reduce((sum, tool) => sum + (tool.average_rating || 0), 0) / totalTools;

        setStats({
          toolCount: totalTools,
          categoryCount: totalCategories,
          monthlyUsers: totalMonthlyUsers,
          averageRating: avgRating
        });
      } catch (error) {
        console.error('Erreur lors du chargement des statistiques:', error);
      }
    }

    loadStats();
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchValue.trim()) return;

    setIsSearching(true);
    try {
      const results = await getTools({ search: searchValue });
      setSearchResults(results);
      
      if (results.length > 0) {
        navigate(`/categories?search=${encodeURIComponent(searchValue)}`);
      }
    } catch (error) {
      console.error('Erreur lors de la recherche:', error);
    } finally {
      setIsSearching(false);
    }
  }, [searchValue, navigate]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white">
      <GlowingShapes />
      <div className="max-w-7xl mx-auto px-6 pt-24 pb-16">
        <div className="flex justify-center mb-4 animate-fade-in">
          <div className="bg-blue-500/10 px-6 py-3 rounded-full transform group hover:scale-105 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              <div className="relative flex items-center gap-2">
                <div className="relative transform group-hover:scale-110 transition-transform duration-500">
                  <Brain className="w-5 h-5 text-blue-500 animate-float" />
                  
                  <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Zap className="w-3 h-3 text-yellow-500 absolute -top-2 left-1/2 -translate-x-1/2 transform -rotate-12" />
                    <Star className="w-3 h-3 text-purple-500 absolute -bottom-2 left-1/2 -translate-x-1/2 transform rotate-12" />
                    <Sparkles className="w-3 h-3 text-green-500 absolute top-1/2 -right-2 -translate-y-1/2" />
                    <Brain className="w-3 h-3 text-red-500 absolute top-1/2 -left-2 -translate-y-1/2" />
                  </div>
                </div>
                <span className="text-blue-500 relative z-10">The Ultimate AI Finder</span>
              </div>
            </div>
          </div>
        </div>

        <h1 className="text-center text-7xl font-bold mb-6 animate-fade-in group" style={{ animationDelay: '0.2s' }}>
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-500 inline-block">
                Trouvez l'IA parfaite
              </span>
              <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Zap className="w-6 h-6 text-yellow-500 absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-12" />
                <Star className="w-6 h-6 text-purple-500 absolute -bottom-4 left-1/2 -translate-x-1/2 transform rotate-12" />
                <Sparkles className="w-6 h-6 text-green-500 absolute top-1/2 -right-4 -translate-y-1/2" />
                <Brain className="w-6 h-6 text-red-500 absolute top-1/2 -left-4 -translate-y-1/2" />
              </div>
            </div>
          </div>
          <br />
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-blue-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
            <div className="relative">
              <span className="text-white group-hover:scale-105 transition-transform duration-500 inline-block">
                pour vos besoins
              </span>
              <div className="absolute inset-0 animate-spin-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Zap className="w-6 h-6 text-yellow-500 absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-12" />
                <Star className="w-6 h-6 text-purple-500 absolute -bottom-4 left-1/2 -translate-x-1/2 transform rotate-12" />
                <Sparkles className="w-6 h-6 text-green-500 absolute top-1/2 -right-4 -translate-y-1/2" />
                <Brain className="w-6 h-6 text-red-500 absolute top-1/2 -left-4 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </h1>

        <p className="text-center text-gray-400 text-xl max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Explorez notre catalogue d'outils d'intelligence artificielle et trouvez
          celui qui correspond exactement à vos besoins
        </p>

        <div className="max-w-2xl mx-auto relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ex: Je veux créer de la musique avec l'IA..."
                className="w-full px-6 py-4 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSearching ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                ) : (
                  <>
                    Rechercher
                    <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-3 gap-6">
          {[
            {
              icon: Search,
              title: "Recherche Intelligente",
              description: "Trouvez rapidement l'outil d'IA idéal en décrivant simplement votre besoin.",
              path: '/categories'
            },
            {
              icon: TrendingUp,
              title: "Classements & Tendances",
              description: "Découvrez les outils d'IA les plus populaires et les mieux notés.",
              path: '/classement'
            },
            {
              icon: Bot,
              title: "Assistant IA",
              description: "Laissez notre chatbot vous guider vers les meilleures solutions d'IA.",
              path: '/assistant'
            }
          ].map((feature, index) => (
            <Link
              key={feature.title}
              to={feature.path}
              className="bg-black/40 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group animate-fade-in"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-500 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-400 mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
                En savoir plus <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="bg-black/20 py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-500/5"></div>
        <div className="max-w-7xl mx-auto px-6 relative">
          <h2 className="text-3xl font-bold text-center text-blue-500 mb-2 animate-fade-in">
            DexofAI en chiffres
          </h2>
          <p className="text-center text-gray-400 mb-12 animate-fade-in">
            La plus grande collection d'outils d'IA
          </p>

          <div className="grid grid-cols-4 gap-6">
            {[
              { icon: Database, value: stats.toolCount.toString(), label: 'Outils IA' },
              { icon: Brain, value: stats.categoryCount.toString(), label: 'Catégories' },
              { icon: TrendingUp, value: `${Math.floor(stats.monthlyUsers / 1000)}K+`, label: 'Utilisateurs/mois' },
              { icon: Star, value: stats.averageRating.toFixed(1), label: 'Note moyenne' }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-black/40 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group animate-fade-in"
                style={{ animationDelay: `${0.2 * index}s` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="w-6 h-6 text-blue-500" />
                  </div>
                </div>
                <div className="text-4xl font-bold text-blue-500 text-center mb-2">{stat.value}</div>
                <div className="text-gray-400 text-center">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
