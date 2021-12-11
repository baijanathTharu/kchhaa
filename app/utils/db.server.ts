import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseKey || !supabaseUrl) {
  throw new Error('Missing SUPABASE_KEY or SUPABASE_URL environment variable');
}
const db = createClient(supabaseUrl, supabaseKey);
export default db;
