import { createClient } from '@supabase/supabase-js';
import { environment } from '../environments/environment';


export const supabase = createClient(environment.supabaseUrl, environment.supabaseKey, {
    auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: true,
    }
});
