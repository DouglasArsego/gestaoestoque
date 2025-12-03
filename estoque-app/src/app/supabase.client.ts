import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environments';


export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
});

