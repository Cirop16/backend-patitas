# Imagen base
FROM node:20

# Directorio de trabajo
WORKDIR /app

# Copiar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto de la app
EXPOSE 8080

# Comando para ejecutar la app
CMD ["npm", "run", "dev"]