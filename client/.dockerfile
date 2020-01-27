# base image
FROM node:10.16.3

# set working directory
WORKDIR /app

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.2.0


# add app
COPY . /app

# start app
CMD ng serve 