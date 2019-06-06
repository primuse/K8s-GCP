# Build off this base image
FROM node:latest

# Set up app directory
WORKDIR /usr/src/app

# Expose the server to the host machine
EXPOSE 8080

# Install app dependencies
COPY ./app/package.json /usr/src/app/

# Bundle app source
COPY ./app .

RUN npm install

# Run this command on startup
ENTRYPOINT ["npm", "start"]