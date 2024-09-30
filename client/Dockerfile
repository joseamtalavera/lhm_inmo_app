# Dockerfile

# Build Stage
FROM node:14-alpine AS build

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Build the React app
RUN npm run build

# Production Stage
FROM nginx:stable-alpine

# Copy the build output to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
