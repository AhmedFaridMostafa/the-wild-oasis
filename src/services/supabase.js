import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://hbsoffnggmdxqzozqtib.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhic29mZm5nZ21keHF6b3pxdGliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ3MjE1MzYsImV4cCI6MjA0MDI5NzUzNn0.FZKEflUqeasdKlOSSH4tvK6oSUunvLJT8IMHx4KOuQc";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
