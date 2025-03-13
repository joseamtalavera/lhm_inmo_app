
FROM node:18-alpine

# Install PM2 globally
# RUN npm install -g pm2

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose the application port
EXPOSE 5010

# Start the application using PM2
# CMD ["pm2-runtime", "npm", "--", "start"]
CMD ["npm", "start"]


