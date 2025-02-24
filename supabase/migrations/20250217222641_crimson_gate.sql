/*
  # Initial Data Population

  1. Data Insertion
    - Categories for AI tools
    - Initial set of AI tools
    - Sample features and pricing
    
  2. Content
    - Popular AI tools across categories
    - Verified and featured tools
    - Realistic pricing and features
*/

-- Insert Categories
INSERT INTO categories (name, slug, description, icon) VALUES
('Assistants & Chatbots', 'assistants-chatbots', 'Agents conversationnels et assistants virtuels intelligents', 'MessageSquare'),
('Génération d''images', 'generation-images', 'Créez des images uniques à partir de descriptions textuelles', 'Image'),
('Création musicale', 'creation-musicale', 'Composez et générez de la musique avec l''IA', 'Music'),
('Analyse de données', 'analyse-donnees', 'Outils d''analyse et de visualisation de données', 'BarChart'),
('Productivité', 'productivite', 'Outils pour améliorer votre efficacité quotidienne', 'Zap'),
('Design', 'design', 'Outils de design et de création graphique', 'Layout'),
('Développement', 'developpement', 'Assistants de programmation et outils de développement', 'Code'),
('Recherche', 'recherche', 'Assistants de recherche et d''analyse scientifique', 'Search')
ON CONFLICT (slug) DO NOTHING;

-- Insert AI Tools
INSERT INTO ai_tools (name, slug, description, category_id, image_url, website_url, is_verified, is_featured, monthly_users) VALUES
('ChatGPT', 'chatgpt', 'Assistant conversationnel avancé basé sur GPT-4', (SELECT id FROM categories WHERE slug = 'assistants-chatbots'), 'https://images.unsplash.com/photo-1677442136019-21780ecad995', 'https://chat.openai.com', true, true, 1000000),
('Midjourney', 'midjourney', 'Génération d''images par IA de haute qualité', (SELECT id FROM categories WHERE slug = 'generation-images'), 'https://images.unsplash.com/photo-1519681393784-d120267933ba', 'https://www.midjourney.com', true, true, 500000),
('DALL-E', 'dall-e', 'Création d''images à partir de descriptions textuelles par OpenAI', (SELECT id FROM categories WHERE slug = 'generation-images'), 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4', 'https://labs.openai.com', true, true, 400000),
('Claude', 'claude', 'Assistant IA par Anthropic avec capacités avancées', (SELECT id FROM categories WHERE slug = 'assistants-chatbots'), 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485', 'https://claude.ai', true, false, 300000),
('Stable Diffusion', 'stable-diffusion', 'Modèle open-source de génération d''images', (SELECT id FROM categories WHERE slug = 'generation-images'), 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46', 'https://stability.ai', true, false, 200000),
('Mubert', 'mubert', 'Génération de musique par IA', (SELECT id FROM categories WHERE slug = 'creation-musicale'), 'https://images.unsplash.com/photo-1511379938547-c1f69419868d', 'https://mubert.com', true, false, 100000)
ON CONFLICT (slug) DO NOTHING;

-- Insert Tool Features
INSERT INTO tool_features (tool_id, name, description) 
SELECT id, 'Chat en temps réel', 'Conversation naturelle avec l''IA' FROM ai_tools WHERE slug = 'chatgpt'
UNION ALL
SELECT id, 'Génération de code', 'Support pour plus de 40 langages de programmation' FROM ai_tools WHERE slug = 'chatgpt'
UNION ALL
SELECT id, 'Haute résolution', 'Images jusqu''à 1024x1024 pixels' FROM ai_tools WHERE slug = 'midjourney'
UNION ALL
SELECT id, 'Styles variés', 'Multiples styles artistiques disponibles' FROM ai_tools WHERE slug = 'midjourney';

-- Insert Tool Pricing
INSERT INTO tool_pricing (tool_id, plan_name, price, billing_period, features)
SELECT id, 'Gratuit', 0, 'monthly', ARRAY['Accès basique', 'Utilisation limitée'] FROM ai_tools WHERE slug = 'chatgpt'
UNION ALL
SELECT id, 'Plus', 20, 'monthly', ARRAY['Accès prioritaire', 'GPT-4', 'DALL-E'] FROM ai_tools WHERE slug = 'chatgpt'
UNION ALL
SELECT id, 'Basic', 10, 'monthly', ARRAY['200 images/mois', 'Résolution standard'] FROM ai_tools WHERE slug = 'midjourney'
UNION ALL
SELECT id, 'Standard', 30, 'monthly', ARRAY['Génération illimitée', 'Haute résolution'] FROM ai_tools WHERE slug = 'midjourney';
