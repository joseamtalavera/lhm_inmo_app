# Dockerfile for backend
FROM node:14-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --only=production
COPY . .

# Expose the port
EXPOSE 5010

CMD ["npm", "start"]
