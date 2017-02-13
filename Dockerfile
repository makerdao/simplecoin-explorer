FROM node:6.9.5-alpine
RUN apk add --no-cache bash git
RUN git clone https://github.com/makerdao/simplecoin-explorer.git --recursive /src/simplecoin-explorer
WORKDIR /src/simplecoin-explorer
RUN npm install
COPY copy.sh /src/simplecoin-explorer
RUN ./copy.sh
RUN npm run build
RUN npm install -g pushstate-server

CMD [ "pushstate-server", "build", "3000"]
