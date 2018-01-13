FROM node:boron

ENV PORT 8080
EXPOSE 8080

# Create app directory
RUN mkdir -p /user/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app

# Install npm packages
RUN npm install

COPY . /usr/src/app

# Compile tsc to js
RUN npm install -g typescript
RUN sh -c tsc

CMD npm start
