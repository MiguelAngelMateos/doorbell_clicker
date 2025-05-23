FROM node:20
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Copia el script y hazlo ejecutable
COPY entrypoint.sh .
RUN chmod +x entrypoint.sh

EXPOSE 3000

# Usa el script como comando de inicio
CMD ["./entrypoint.sh"]
