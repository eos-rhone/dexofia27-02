-- Ajouter des outils pour chaque catégorie
DO $$ 
DECLARE
  current_category RECORD;
  tool_count INTEGER;
BEGIN
  -- Pour chaque catégorie
  FOR current_category IN SELECT * FROM categories LOOP
    -- Compter le nombre d'outils existants dans la catégorie
    SELECT COUNT(*) INTO tool_count 
    FROM ai_tools 
    WHERE ai_tools.category_id = current_category.id;
    
    -- Si moins de 2 outils, en ajouter
    IF tool_count < 2 THEN
      -- Insérer au moins 2 outils pour cette catégorie
      INSERT INTO ai_tools (
        name,
        slug,
        description,
        category_id,
        image_url,
        website_url,
        is_verified,
        is_featured,
        monthly_users,
        total_views,
        total_reviews,
        average_rating
      ) VALUES
        (
          current_category.name || ' Pro',
          current_category.slug || '-pro',
          'Solution professionnelle pour ' || current_category.description,
          current_category.id,
          'https://images.unsplash.com/photo-1677442136019-21780ecad995',
          'https://' || current_category.slug || '-pro.ai',
          true,
          true,
          200000 + floor(random() * 300000),
          400000 + floor(random() * 600000),
          2000 + floor(random() * 3000),
          4.5 + random() * 0.5
        ),
        (
          current_category.name || ' AI',
          current_category.slug || '-ai',
          'Assistant IA pour ' || current_category.description,
          current_category.id,
          'https://images.unsplash.com/photo-1620712943543-bcc4688e7485',
          'https://' || current_category.slug || '-ai.com',
          true,
          false,
          150000 + floor(random() * 250000),
          300000 + floor(random() * 500000),
          1500 + floor(random() * 2500),
          4.3 + random() * 0.5
        );

      -- Ajouter les fonctionnalités pour les nouveaux outils
      INSERT INTO tool_features (tool_id, name, description)
      SELECT 
        id,
        'Fonctionnalités avancées',
        'Suite complète d''outils professionnels'
      FROM ai_tools 
      WHERE slug = current_category.slug || '-pro'
      UNION ALL
      SELECT 
        id,
        'Assistant IA',
        'Support intelligent et automatisé'
      FROM ai_tools 
      WHERE slug = current_category.slug || '-ai';

      -- Ajouter les plans tarifaires pour les nouveaux outils
      INSERT INTO tool_pricing (tool_id, plan_name, price, billing_period, features)
      SELECT 
        id,
        'Pro',
        99.99,
        'monthly',
        ARRAY['Fonctionnalités avancées', 'Support prioritaire']
      FROM ai_tools 
      WHERE slug = current_category.slug || '-pro'
      UNION ALL
      SELECT 
        id,
        'Standard',
        49.99,
        'monthly',
        ARRAY['Fonctionnalités de base', 'Support par email']
      FROM ai_tools 
      WHERE slug = current_category.slug || '-ai';
    END IF;
  END LOOP;

  -- Mettre à jour les timestamps
  UPDATE ai_tools
  SET updated_at = CURRENT_TIMESTAMP
  WHERE created_at = updated_at;

END $$;
