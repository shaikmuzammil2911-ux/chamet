import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://xrhzwrsasrfcxyknbnvt.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhyaHp3cnNhc3JmY3h5a25ibnZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQyMDM2NDMsImV4cCI6MjEwOTc3OTY0M30.jb2rD57qm1G7Ik-8BcXwkbRQlJ5OcnR1jQWciodaeEc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

