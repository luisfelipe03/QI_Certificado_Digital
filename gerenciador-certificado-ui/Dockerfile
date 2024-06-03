# Use a imagem base oficial do Node.js
FROM node:18-alpine

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de definição de dependências para o diretório de trabalho
COPY package*.json ./

# Instale apenas as dependências de produção
RUN npm install --production

# Copie o restante dos arquivos da aplicação para o diretório de trabalho
COPY . .

# Construa a aplicação
RUN npm run build

# Exponha a porta que a aplicação irá usar
EXPOSE 3000

# Especifica o usuário não-root que irá rodar a aplicação
USER node

# Defina o comando padrão a ser executado quando o contêiner iniciar
ENTRYPOINT [ "npm", "start" ]
