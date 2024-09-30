# Dockerfile

# Use Node.js base image
FROM node:14-alpine

# Set working directory
WORKDIR /app

# Install dependencies (only production dependencies)
COPY package*.json ./
RUN npm install --only=production

# Copy source code
COPY . .

# Expose port 5000
EXPOSE 5000

# Set environment variable for production
ENV NODE_ENV=production

# Start the app
CMD ["node", "app.js"]
