# Usas una imagen de Node.js como base
FROM node:latest
# Crear carpeta para la aplicación
WORKDIR /usr/src/app
# Instalar dependencias
# Se usa un comodín para garantizar que ambos package.json Y packagelock.json sean copiados
COPY package*.json ./
RUN npm install

COPY . .

#Exponer el Puerto donde correrá la aplicación
EXPOSE 3030
#Comando para ejecutar la aplicación
CMD [ "node", "app.js" ]