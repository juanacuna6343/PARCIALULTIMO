const { createClient } = require('@supabase/supabase-js');
const env = require('../config/env');

const supabaseUrl = env.supabase.url?.trim();
const supabaseKey = env.supabase.key?.trim();

console.log('🔍 DEBUG Supabase Config:');
console.log('URL:', supabaseUrl);
console.log('KEY:', supabaseKey ? supabaseKey.substring(0, 20) + '...' : 'undefined');

const usingPlaceholders =
  supabaseUrl?.includes('your-') || supabaseKey?.includes('your-');

let supabase = null;
const supabaseConfigured = Boolean(
  supabaseUrl && supabaseKey && !usingPlaceholders
);

console.log('usingPlaceholders:', usingPlaceholders);
console.log('supabaseConfigured:', supabaseConfigured);

if (supabaseConfigured) {
  supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
    },
  });
  console.log('✅ Supabase client inicializado correctamente');
} else {
  console.warn(
    '⚠️ Supabase no está configurado o contiene valores de ejemplo. El backend usará datos mock cuando sea posible.'
  );
}

module.exports = { supabase, supabaseConfigured };
