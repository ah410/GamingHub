import { createClient } from "@supabase/supabase-js";

const API_KEY = process.env.VITE_SUPABASE_API_KEY;
const URL = process.env.VITE_SUPABASE_URL;  

export const supabase = createClient(URL, API_KEY);