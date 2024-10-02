# Usa una imagen de Node.js como base
FROM node:16-alpine
# Instala Python, Make y GCC para la compilación de dependencias nativas
RUN apk add --no-cache python3 make g++

# Crea un directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de dependencias package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia el resto del código de la aplicación
COPY . .

# Expone el puerto en el que corre la aplicación (cambia 3000 por el puerto de tu aplicación)
EXPOSE 3000

# Define el comando de inicio
CMD ["npm", "start"]
