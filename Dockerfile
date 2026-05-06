# Use official Node.js lightweight image
FROM node:21-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json first (for layer caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source files
COPY . .

# Expose port 8080 (Cloud Run default)
EXPOSE 8080

# Start the app
CMD ["node", "server.js"]
