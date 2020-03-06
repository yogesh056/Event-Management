FROM node:lts-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN sudo npm install

# Bundle app source
COPY . /usr/src/app


EXPOSE 3000

CMD ["sudo","npm", "start" ]