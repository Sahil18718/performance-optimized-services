FROM node:18

# Set the working directory inside the container
WORKDIR /workspace

# Copy only package files for dependency installation
COPY package.json yarn.lock ./

# Install Nx globally and other dependencies
RUN yarn global add nx && yarn install --network-timeout 100000

# Expose the service port
EXPOSE 3001

# Start the service using Nx
CMD ["yarn","nx", "serve", "scam-service"]
