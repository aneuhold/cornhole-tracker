# The Dockerfile for the node-server service
#
# There isn't a Dockerfile for the mongo DB because it doesn't need one it seems.
FROM node
WORKDIR /usr/node-server
COPY package.json .
RUN yarn
COPY . .