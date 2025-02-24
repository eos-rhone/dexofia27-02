import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from '../components/Icon';
import { 
  Search, 
  MessageSquare, 
  Image, 
  Music, 
  FileText, 
  Microscope, 
  Zap, 
  Layout, 
  Cuboid, 
  Mic2, 
  GraduationCap, 
  Folder,
  Star, 
  Bot, 
  Shield, 
  Heart, 
  LineChart, 
  Home, 
  Gamepad, 
  Beaker,
  Scale, 
  Languages, 
  Car, 
  Leaf, 
  Shirt, 
  Building2,
  Users, 
  Brain, 
  Code, 
  Video, 
  Camera, 
  Briefcase,
  Database,
  Headphones,
  Radio,
  Palette,
  Building,
  Factory,
  Truck,
  Film,
  Mountain,
  Waves,
  Pencil,
  Dumbbell,
  Eye,
  ArrowUpRight,
  Rocket,
  FlaskConical,
  CircuitBoard,
  Globe,
  Glasses
} from 'lucide-react';
import { getTools, getCategories } from '../lib/supabase';
import { AiBrain } from '../components/icons/AiBrain';
import { Acoustic } from '../components/icons/Acoustic';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: {
    name: string;
    icon: string;
  };
  average_rating: number;
  total_reviews: number;
  total_views: number;
  monthly_users: number;
  image_url: string;
  website_url: string;
  is_verified: boolean;
  is_featured: boolean;
  pricing: {
    plan_name: string;
    price: number;
  }[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
}

const iconMap = {
  MessageSquare,
  Image,
  Music,
  FileSpreadsheet: FileText,
  Microscope,
  Zap,
  Layout,
  Cube: Cuboid,
  Mic2,
  GraduationCap,
  Bot,
  Shield,
  Heart,
  LineChart,
  Home,
  Gamepad,
  Flask: Beaker,
  Scale,
  Languages,
  Car,
  Leaf,
  Shirt,
  Building2,
  Users,
  Brain,
  Code,
  Video,
  Camera,
  Briefcase,
  Database,
  Headphones,
  Radio,
  AiBrain,
  Acoustic,
  Palette,
  Building,
  Factory,
  Truck,
  Film,
  Mountain,
  Waves,
  Pencil,
  Dumbbell,
  Eye,
  Rocket,
  FlaskConical,
  CircuitBoard,
  Globe,
  Glasses,
  Folder
};

const colorClasses = [
  'bg-blue-500',
  'bg-purple-500',
  'bg-green-500',
  'bg-amber-500',
  'bg-rose-500',
  'bg-indigo-500',
];

export function CategoryPage() {
  const { slug } = useParams();
  const [tools, setTools] = useState<Tool[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        // Charger la catégorie
        const categoriesData = await getCategories();
        const currentCategory = categoriesData.find(cat => cat.slug === slug);
        console.log('Catégorie chargée:', currentCategory);
        setCategory(currentCategory || null);

        // Charger les outils de la catégorie
        const toolsData = await getTools({
          category: slug,
          search: searchQuery
        });
        console.log('Outils chargés:', toolsData);
        setTools(toolsData);
      } catch (error) {
        console.error('Error loading category data:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadData();
  }, [slug, searchQuery]);

  // Debug: afficher l'état actuel
  console.log('État actuel:', {
    category,
    iconComponent: category ? iconMap[category.icon] : null,
    availableIcons: Object.keys(iconMap)
  });

  const getBadges = (tool: Tool) => {
    const badges = [];
    if (tool.is_verified) badges.push('Vérifié');
    if (tool.is_featured) badges.push('Populaire');
    return badges;
  };

  const formatPrice = (tool: Tool) => {
    if (!tool.pricing?.length) return 'Gratuit';
    
    const hasFree = tool.pricing.some(p => p.price === 0);
    const hasPaid = tool.pricing.some(p => p.price > 0);
    
    if (hasFree && hasPaid) return 'Gratuit / Premium';
    if (hasFree) return 'Gratuit';
    return 'Premium';
  };

  if (!category) {
    return (
      <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center">Catégorie non trouvée</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Animated Header with Category Icon */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              {/* Main category icon with rotation and scale animation */}
              <div className="relative bg-gray-900/80 p-8 rounded-full transform group-hover:scale-110 transition-transform duration-500">
                <div className={`w-24 h-24 rounded-2xl ${colorClasses[0]} flex items-center justify-center`}>
                  {(() => {
                    const IconComponent = iconMap[category.icon];
                    if (!IconComponent) {
                      console.warn(`Icône manquante pour ${category.name}: ${category.icon}`);
                      return <Icon icon={Folder} size={48} className="text-white" />;
                    }
                    return <Icon icon={IconComponent} size={48} className="text-white" />;
                  })()}
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute inset-0 animate-spin-slow">
                  <Star className="w-8 h-8 text-yellow-500 absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-12" />
                  <MessageSquare className="w-8 h-8 text-purple-500 absolute -bottom-4 left-1/2 -translate-x-1/2 transform rotate-12" />
                  <Zap className="w-8 h-8 text-green-500 absolute top-1/2 -right-4 -translate-y-1/2" />
                  <Search className="w-8 h-8 text-red-500 absolute top-1/2 -left-4 -translate-y-1/2" />
                </div>
                
                {/* Particle effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-float-particle-1"></div>
                  <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float-particle-2"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-green-500 rounded-full animate-float-particle-3"></div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4 animate-fade-in">
            {category.name}
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto animate-fade-in">
            {category.description}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Rechercher un outil dans ${category.name}...`}
                className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Tools Grid */}
        {!isLoading && (
          <div className="space-y-6">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-500/10 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-6 flex gap-6">
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={tool.image_url}
                      alt={tool.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          {getBadges(tool).map((badge) => (
                            <span
                              key={badge}
                              className={`px-2 py-1 text-xs rounded-full ${
                                badge === 'Vérifié'
                                  ? 'bg-blue-500 text-white'
                                  : badge === 'Populaire'
                                  ? 'bg-purple-500 text-white'
                                  : 'bg-green-500 text-white'
                              }`}
                            >
                              {badge}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                          {tool.name}
                        </h3>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">Prix</div>
                          <div className="font-medium">{formatPrice(tool)}</div>
                        </div>
                        <a
                          href={tool.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-blue-500/10 rounded-lg text-blue-500 hover:bg-blue-500 hover:text-white transition-colors group/btn"
                          title={`Visiter ${tool.name}`}
                        >
                          <ArrowUpRight className="w-5 h-5 group-hover/btn:rotate-45 transition-transform" />
                        </a>
                      </div>
                    </div>
                    <p className="text-gray-400 mb-4">{tool.description}</p>
                    <div className="flex items-center gap-6 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium text-white">{tool.average_rating}</span>
                        <span>({tool.total_reviews} avis)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {tool.monthly_users.toLocaleString()} utilisateurs
                      </div>
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4" />
                        {tool.total_views.toLocaleString()} vues
                      </div>
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        {tool.total_reviews} commentaires
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
