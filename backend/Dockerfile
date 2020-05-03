# pull official node latest image
FROM node:latest

# set working directory
WORKDIR /usr/src/app

# copy packag
COPY package.json .

# install dependencies
RUN npm install 

# add app
COPY . .

# expose port
EXPOSE 8080