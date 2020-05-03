# pull official base image
# FROM node:13.12.0-alpine
FROM node:latest
# set working directory
WORKDIR /usr/src/app

# add `/app/node_modules/.bin` to $PATH
# ENV PATH /usr/src/app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json .
# COPY package-lock.json ./

RUN npm install 

# add app
COPY . .

EXPOSE 3000
# Default command
# CMD ["npm", "start"]

# start app
# CMD ["npm", "start"]