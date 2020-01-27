# base image
FROM node:10.16.3

# set working directory
WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
RUN npm install
RUN npm install -g @angular/cli@7.3.9


# add app
COPY . /app

# start app
CMD ng serve --host 0.0.0.0