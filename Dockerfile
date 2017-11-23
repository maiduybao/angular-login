FROM node:carbon

RUN mkdir -p /usr/src/angular-login

# Create app directory
WORKDIR /usr/src/angular-login

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /usr/src/angular-login

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . /usr/src/angular-login

EXPOSE 4000
CMD [ "npm", "start" ]

