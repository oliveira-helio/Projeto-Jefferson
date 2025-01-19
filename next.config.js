/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: true,
  experimental: {
    appDir: true, // Habilita a estrutura "app"
  },
  // Define o diretório base do projeto como `src`
  basePath: '',
   images: {
      
      remotePatterns:
         [{
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            pathname: '/**',
         }]
   }
}

module.exports = nextConfig
