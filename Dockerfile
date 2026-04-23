# Use official Node.js image as the base image
FROM node:20.11.0 as build-stage

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package*.json  ./

RUN npm config set registry https://registry.npmjs.org/ && \
    npm config set fetch-retry-maxtimeout 600000 && \
    npm config set fetch-retry-mintimeout 20000
# Install dependencies
RUN npm install --legacy-peer-deps

# Copy the rest of the application code
COPY . .

ARG VUE_APP_API_BASE_URL
ENV VUE_APP_API_BASE_URL=$VUE_APP_API_BASE_URL

# vérifier variable
RUN echo "API URL = $VUE_APP_API_BASE_URL"

# Build the application
RUN npm run build

# ================================
# Production stage
# ================================
FROM nginx:alpine AS Production

# Copy build output from build stage to nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# (optionnel mais bien)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port
EXPOSE 80

# Run nginx
CMD ["nginx", "-g", "daemon off;"]