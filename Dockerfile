# Usando a imagem oficial do Node.js
FROM node:18

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar package.json e package-lock.json
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o projeto
COPY . .

# Expor a porta onde o app será executado
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "dev"]
