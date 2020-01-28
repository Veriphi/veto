FROM node:12.14.1-alpine3.9 AS veto-builder
RUN mkdir /veto
WORKDIR /veto

# Install dependencies
COPY ./yarn.lock .
COPY ./packages/ ./packages/
COPY ./package.json .
COPY ./tsconfig.json .
RUN yarn install

# Build application
# TODO: Cleanup some more
# SKIP_PREFLIGHT_CHECK to tell react-scripts to not warn about storybook's webpack version
RUN SKIP_PREFLIGHT_CHECK=true yarn build && \
    rm -fr packages/veto-frontend/node_modules

FROM node:12.14.1-alpine3.9 AS screen-app
RUN mkdir /veto
EXPOSE 8080
WORKDIR /veto

# Install dependencies
# Copy generated frontend files
COPY --from=veto-builder /veto/packages/screen-app ./packages/screen-app

# Copy dependnecies
COPY --from=veto-builder /veto/package.json ./package.json
COPY --from=veto-builder /veto/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile

ENTRYPOINT NODE_ENV=production node ./packages/screen-app/out/index.js

FROM node:12.14.1-alpine3.9 AS veto-app
RUN mkdir /veto
EXPOSE 8080
WORKDIR /veto

# Install dependencies
# Copy backend project
COPY --from=veto-builder /veto/packages/veto-backend ./packages/veto-backend

# Copy generated frontend files
COPY --from=veto-builder /veto/packages/veto-frontend/build ./frontend

# Copy dependnecies
COPY --from=veto-builder /veto/package.json ./package.json
COPY --from=veto-builder /veto/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile

ENTRYPOINT NODE_ENV=production node ./packages/veto-backend/out/index.js
