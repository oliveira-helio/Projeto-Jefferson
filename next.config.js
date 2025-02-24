/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
   experimental: {
     appDir: true, // Habilita a estrutura "app"
   },
   // Define o diretório base do projeto como `src`
   basePath: '',
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: 'firebasestorage.googleapis.com',
         pathname: '/**',
       },
       {
         protocol: 'https',
         hostname: 'sandbox.melhorenvio.com.br',
         pathname: '/images/shipping-companies/**',
       },
     ],
   },
 };
 
 module.exports = { reactStrictMode: false, nextConfig}
 