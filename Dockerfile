# Use official Node.js image as the base image
FROM node:20.11.0 as build-stage

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application (if applicable)
# Replace this with the actual build command if necessary
# For example, if you're using Vue.js, you might need to run `npm run build`
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy build output from build stage to nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
