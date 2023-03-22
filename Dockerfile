FROM node:16.13.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json /app
COPY package-lock.json /app
RUN npm install

# add app
COPY . /app

# setting env
ENV RUNTIME_TESTS=DOCKER
ENV RUNTIME_HUB=DOCKER

## CHROME || FIREFOX || EDGE
ENV BROWSER=FIREFOX


# start app
CMD ["npm", "run", "tests"]