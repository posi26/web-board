# Use an official Node.js 20 image as the base image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install NestJS dependencies using npm
RUN npm install --production

# Copy the rest of your application code
COPY . .

# Build NestJS application
RUN npm run build

# Expose the port your app runs on (if it's not already specified in your NestJS application)
EXPOSE 3000

# Start the server using the production build
CMD ["npm", "run", "start:prod"]
