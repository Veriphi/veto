FROM node:12.14.1-alpine3.9
RUN mkdir /veto
EXPOSE 8080
WORKDIR /veto

# Install dependencies
COPY yarn.lock .
RUN yarn install --production --frozen-lockfile

# Build application
COPY . .
# TODO: Cleanup some more
RUN yarn build && \
    rm -fr packages/veto-frontend/node_modules

ENTRYPOINT NODE_ENV=production node ./packages/veto-backend/out/index.js
