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
    rm -fr packages/veto-app/frontend/node_modules

FROM node:12.14.1-alpine3.9 AS screen-app
RUN mkdir /veto
EXPOSE 8080
WORKDIR /veto

# Install dependencies
# Copy shared packages
COPY --from=veto-builder /veto/packages/shared ./packages/shared

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
# Copy shared packages
COPY --from=veto-builder /veto/packages/shared ./packages/shared

# Copy backend project
COPY --from=veto-builder /veto/packages/veto-app/backend ./packages/veto-app/backend

# Copy generated frontend files
COPY --from=veto-builder /veto/packages/veto-app/frontend/build ./packages/veto-app/frontend/build

# Copy dependnecies
COPY --from=veto-builder /veto/package.json ./package.json
COPY --from=veto-builder /veto/yarn.lock ./yarn.lock

RUN yarn install --production --frozen-lockfile

# ENTRYPOINT NODE_ENV=production PATH_TO_STATIC_FILES=/veto/packages/veto-app/frontend/build node ./packages/veto-app/backend/out/index.js
CMD NODE_ENV=production PATH_TO_STATIC_FILES=./packages/veto-app/frontend/build node ./packages/veto-app/backend/out/index.js