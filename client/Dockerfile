# Stage 1: Build the React app
FROM node:14-alpine AS build

WORKDIR /app

# Set build-time environment variables
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .
RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the Nginx configuration file
# COPY nginx.conf /etc/nginx/nginx.conf. Esta ya en EC2.

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
