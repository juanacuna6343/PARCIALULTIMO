const app = require('./app');
const env = require('./config/env');
const { supabaseConfigured } = require('./lib/supabase');

async function start() {
  try {
    console.log('\n🌱 Mock data inicializado en memoria\n');
    
    app.listen(env.port, () => {
      console.log(`🚀 SGDI Backend corriendo en http://localhost:${env.port}`);
      console.log(`📊 Environment: ${env.nodeEnv}`);
      console.log(`🗄️  Database: ${supabaseConfigured ? '✅ Supabase Connected' : 'Mock Data (sin base de datos)'}\n`);
      console.log('📋 Credenciales de prueba:');
      console.log('   Email: admin@sgdi.local');
      console.log('   Contraseña: Admin123!\n');
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error);
    process.exit(1);
  }
}

start();
