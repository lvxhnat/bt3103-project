# Use an official Node.js image as a base
FROM node:14-alpine AS build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm cache clean --force && npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Vue.js application for production with minification
RUN npm run build

# Expose port 8080 to the outside world
EXPOSE 8080

# Command to serve the built files using Node.js's HTTP server
CMD ["npx", "http-server", "dist", "-p", "8080"]
