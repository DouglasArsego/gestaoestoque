import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://ejkxansxpnvtklfyauyg.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqa3hhbnN4cG52dGtsZnlhdXlnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2NTc3NDQsImV4cCI6MjA4MDIzMzc0NH0.xZnqogWsnLyIOcfqZqVH-wxDp7mDwWxCMIQU1wNJc8M';

export const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
});

