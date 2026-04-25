import { Database } from "@/database.types";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl) throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL");
if (!supabaseKey) throw new Error("Missing NEXT_PUBLIC_SUPABASE_ANON_KEY");

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

