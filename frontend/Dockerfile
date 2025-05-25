# Utvikling
FROM node:20-alpine AS development
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . ./
EXPOSE 5173
CMD ["npx", "vite", "--host", "0.0.0.0"]

# Bygg
FROM node:20-alpine AS build
WORKDIR /app
ARG MODE=production
COPY package.json package-lock.json ./
RUN npm ci
COPY . ./
RUN npm run build -- --mode ${MODE}

#Produksjon
FROM nginx:alpine AS production
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist .
RUN echo 'server { listen 5173; root /usr/share/nginx/html; index index.html; location / { try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 5173
CMD ["nginx", "-g", "daemon off;"]