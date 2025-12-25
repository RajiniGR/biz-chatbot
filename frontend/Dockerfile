# ---------- Build stage ----------
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm ci

# Copy EVERYTHING including index.html
COPY . .

# Build Vite app
RUN npm run build

# ---------- Production stage ----------
FROM nginx:alpine

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html

# Expose HTTP
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
