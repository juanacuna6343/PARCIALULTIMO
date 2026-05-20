const { createClient } = require('@supabase/supabase-js');
const env = require('../config/env');

const supabase = createClient(env.supabase.url, env.supabase.key, {
  auth: {
    persistSession: false
  }
});

module.exports = { supabase };
