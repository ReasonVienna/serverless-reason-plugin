FROM amazonlinux:2016.09

# INSTALL NODE AND YARN
WORKDIR /app

ENV NPM_CONFIG_LOGLEVEL info
ENV NODE_VERSION 7.7.0

# gcc -> needed for ocaml
RUN yum install -y xz git gcc m4 which \
  && curl -SLO "https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.xz" \
  && unxz "node-v$NODE_VERSION-linux-x64.tar.xz" \
  && tar -xf "node-v$NODE_VERSION-linux-x64.tar" -C /usr/local --strip-components 1 \
  && rm "node-v$NODE_VERSION-linux-x64.tar" \
  && ln -s /usr/local/bin/node /usr/local/bin/nodejs

ENV YARN_VERSION 0.21.3

RUN curl -fSL -o yarn.js "https://yarnpkg.com/downloads/$YARN_VERSION/yarn-legacy-$YARN_VERSION.js" \
  && mv yarn.js /usr/local/bin/yarn \
  && chmod +x /usr/local/bin/yarn

# Do our application specific stuff
COPY . /app/

RUN yarn install \
  && yarn global add serverless --prefix /usr/local
