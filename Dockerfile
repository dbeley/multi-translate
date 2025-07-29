# Use Node 18 LTS
FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm ci --only=production

# Copy application files
COPY . .

# Expose the port used by the server
EXPOSE 3000

# Start the server
CMD [ "node", "server.js" ]
