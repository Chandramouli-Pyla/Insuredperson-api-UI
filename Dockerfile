# Step 1: Build React app
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Copy built React app to Nginx
COPY --from=build /app/build /usr/share/nginx/html

# Copy Nginx template config (use .template extension)
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Install envsubst for environment variable substitution
RUN apk add --no-cache bash gettext

# Cloud Run injects $PORT; replace ${PORT} in config at runtime
CMD /bin/sh -c "envsubst '\$PORT' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"
