import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, Image, Music, FileSpreadsheet, Microscope, Zap, Layout, Cuboid as Cube, Mic2, GraduationCap, Folders, Star, Sparkles, ArrowUpRight, Bot, Shield, Heart, LineChart, Home, Gamepad, FlaskRound, Scale, Languages, Car, Leaf, Shirt, Building2, Users, Brain, Code, Brush, Video, Camera, Briefcase, Book, Lightbulb, Wrench, Shapes, PenTool, Globe, Rocket, Database, Volume2, Headphones, Radio, Wand2, Palette, Stethoscope, Calculator, Binary, CircuitBoard, Cpu, Network, Cloud, Fingerprint, VenetianMask, Glasses, Dices, Puzzle, Trophy } from 'lucide-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { getCategories, getTools } from '../lib/supabase';
import { AiBrain } from '../components/icons/AiBrain';

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

const iconMap: { [key: string]: React.ReactNode } = {
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  Image: <Image className="w-8 h-8" />,
  Music: <Music className="w-8 h-8" />,
  FileSpreadsheet: <FileSpreadsheet className="w-8 h-8" />,
  Microscope: <Microscope className="w-8 h-8" />,
  Zap: <Zap className="w-8 h-8" />,
  Layout: <Layout className="w-8 h-8" />,
  Cube: <Cube className="w-8 h-8" />,
  Mic2: <Mic2 className="w-8 h-8" />,
  GraduationCap: <GraduationCap className="w-8 h-8" />,
  Bot: <Bot className="w-8 h-8" />,
  Shield: <Shield className="w-8 h-8" />,
  Heart: <Heart className="w-8 h-8" />,
  LineChart: <LineChart className="w-8 h-8" />,
  Home: <Home className="w-8 h-8" />,
  Gamepad: <Gamepad className="w-8 h-8" />,
  Flask: <FlaskRound className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
  Languages: <Languages className="w-8 h-8" />,
  Car: <Car className="w-8 h-8" />,
  Leaf: <Leaf className="w-8 h-8" />,
  Shirt: <Shirt className="w-8 h-8" />,
  Building2: <Building2 className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />,
  AiBrain: <AiBrain className="w-8 h-8" />,
  Brain: <Brain className="w-8 h-8" />,
  Code: <Code className="w-8 h-8" />,
  Brush: <Brush className="w-8 h-8" />,
  Video: <Video className="w-8 h-8" />,
  Camera: <Camera className="w-8 h-8" />,
  Briefcase: <Briefcase className="w-8 h-8" />,
  Book: <Book className="w-8 h-8" />,
  Lightbulb: <Lightbulb className="w-8 h-8" />,
  Wrench: <Wrench className="w-8 h-8" />,
  Shapes: <Shapes className="w-8 h-8" />,
  PenTool: <PenTool className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Rocket: <Rocket className="w-8 h-8" />,
  Database: <Database className="w-8 h-8" />,
  Volume2: <Volume2 className="w-8 h-8" />,
  Headphones: <Headphones className="w-8 h-8" />,
  Radio: <Radio className="w-8 h-8" />,
  Wand2: <Wand2 className="w-8 h-8" />,
  Palette: <Palette className="w-8 h-8" />,
  Stethoscope: <Stethoscope className="w-8 h-8" />,
  Calculator: <Calculator className="w-8 h-8" />,
  Binary: <Binary className="w-8 h-8" />,
  CircuitBoard: <CircuitBoard className="w-8 h-8" />,
  Cpu: <Cpu className="w-8 h-8" />,
  Network: <Network className="w-8 h-8" />,
  Cloud: <Cloud className="w-8 h-8" />,
  Fingerprint: <Fingerprint className="w-8 h-8" />,
  VenetianMask: <VenetianMask className="w-8 h-8" />,
  Glasses: <Glasses className="w-8 h-8" />,
  Dices: <Dices className="w-8 h-8" />,
  Puzzle: <Puzzle className="w-8 h-8" />,
  Trophy: <Trophy className="w-8 h-8" />
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
            // Récupérer uniquement les outils de cette catégorie spécifique
            const tools = await getTools({ 
              category: category.slug,
              // Ne pas inclure de recherche ici pour avoir tous les outils de la catégorie
            });
            
            // Trier les outils par nombre d'utilisateurs
            const sortedTools = tools.sort((a, b) => b.monthly_users - a.monthly_users);
            
            // Sélectionner les 4 outils les plus populaires de la catégorie
            const popularTools = sortedTools.slice(0, 4).map(tool => ({
              name: tool.name,
              slug: tool.slug,
              website_url: tool.website_url
            }));
            
            return {
              ...category,
              tool_count: tools.length, // Nombre réel d'outils dans la catégorie
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

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500 animate-pulse"></div>
              
              <div className="relative bg-gray-900/80 p-8 rounded-full transform group-hover:scale-110 transition-transform duration-500">
                <Folders className="w-16 h-16 text-blue-500 animate-float" />
                
                <div className="absolute inset-0 animate-spin-slow">
                  <Zap className="w-8 h-8 text-yellow-500 absolute -top-4 left-1/2 -translate-x-1/2 transform -rotate-12" />
                  <Star className="w-8 h-8 text-purple-500 absolute -bottom-4 left-1/2 -translate-x-1/2 transform rotate-12" />
                  <Sparkles className="w-8 h-8 text-green-500 absolute top-1/2 -right-4 -translate-y-1/2" />
                  <Layout className="w-8 h-8 text-red-500 absolute top-1/2 -left-4 -translate-y-1/2" />
                </div>
                
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-float-particle-1"></div>
                  <div className="absolute bottom-0 right-1/4 w-2 h-2 bg-purple-500 rounded-full animate-float-particle-2"></div>
                  <div className="absolute top-1/2 right-0 w-2 h-2 bg-green-500 rounded-full animate-float-particle-3"></div>
                </div>
              </div>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mb-4">
            Catégories
          </h1>
          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            Explorez notre catalogue d'outils d'intelligence artificielle par catégorie
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
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
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 rounded-lg p-4 mb-8 text-red-500">
            {error}
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category, index) => (
              <div
                key={category.slug}
                className="bg-gray-900/50 rounded-xl p-6 border border-gray-800 hover:border-blue-500 transition-all transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10 group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-500 bg-opacity-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  {iconMap[category.icon]}
                </div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold group-hover:text-blue-500 transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-blue-500 text-sm bg-blue-500/10 px-2 py-1 rounded-full">
                    {category.tool_count} outils
                  </span>
                </div>
                <p className="text-gray-400 mb-6">{category.description}</p>
                <div className="space-y-4">
                  <p className="text-blue-500 text-sm">Outils populaires</p>
                  <div className="flex flex-wrap gap-2">
                    {category.popularTools.map((tool) => (
                      <a
                        key={tool.slug}
                        href={tool.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-400 hover:bg-blue-500/10 hover:text-blue-500 transition-all duration-300 cursor-pointer transform hover:scale-105 flex items-center gap-1 group/tool"
                      >
                        {tool.name}
                        <ArrowUpRight className="w-3 h-3 opacity-0 group-hover/tool:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </div>
                <RouterLink 
                  to={`/categories/${category.slug}`}
                  className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors rounded-lg flex items-center justify-center gap-2 group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explorer
                    <Search className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </RouterLink>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
