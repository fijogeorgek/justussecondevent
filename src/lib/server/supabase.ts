import { createClient } from '@supabase/supabase-js'
import { SUPABASE_URL, SUPABASE_SERVICE_KEY } from '$env/static/private'

// Use service key for server-side operations
export const supabaseAdmin = createClient(
    SUPABASE_URL,
    SUPABASE_SERVICE_KEY
)