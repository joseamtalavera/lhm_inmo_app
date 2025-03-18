
FROM node:18-bullseye

# Install PM2 globally
# RUN npm install -g pm2
# Install system libraries required by sharp
RUN apt-get update && apt-get install -y python3 make g++ libvips-dev fftw3-dev && rm -rf /var/lib/apt/lists/*

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


