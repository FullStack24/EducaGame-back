FROM node:20-alpine

# Define o diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o Prisma Client com os alvos binários corretos
RUN npx prisma generate

# Expõe a porta da aplicação
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "run", "start", "prisma:generate"]