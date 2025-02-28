import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('SUPABASE_URL et SUPABASE_KEY sont requis dans le fichier .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log('Test de connexion à Supabase...');
    console.log('URL:', supabaseUrl);

    try {
        // Test de lecture
        const { data: tools, error: readError } = await supabase
            .from('tools')
            .select('*')
            .limit(1);

        if (readError) {
            throw readError;
        }

        console.log('Lecture réussie !');
        console.log('Premier outil:', tools?.[0]);

        // Test d'insertion
        const testTool = {
            name: 'Test Tool ' + Date.now(),
            description: 'A test AI tool',
            website_url: 'https://example.com',
            is_verified: false
        };

        const { data: inserted, error: insertError } = await supabase
            .from('tools')
            .insert(testTool)
            .select()
            .single();

        if (insertError) {
            throw insertError;
        }

        console.log('Insertion réussie !');
        console.log('Outil inséré:', inserted);

    } catch (error) {
        console.error('Erreur:', error);
    }
}

main();
