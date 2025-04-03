/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
   experimental: {
    //  appDir: true, // Habilita a estrutura "app"
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
      },{
        protocol: 'https',
        hostname: 'melhorenvio.com.br',
        pathname: '/images/shipping-companies/**',
      },{
        protocol: "https",
        hostname: "pincel-e-poesia.s3.amazonaws.com",
      },{
        protocol: 'https',
        hostname: 'pincel-e-posia-teste.s3.amazonaws.com',
        pathname: '/**',
      },
     ],
   },
 };
 
 module.exports = nextConfig
 