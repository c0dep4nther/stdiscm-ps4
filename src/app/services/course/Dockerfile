# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 5002

# Start the server
CMD ["node", "app.js"]
