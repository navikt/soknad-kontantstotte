FROM buildkite/puppeteer
RUN mkdir /app
WORKDIR /app

COPY ./package.json /app/
RUN npm i

COPY ./jest.config.js ./jest.setup.js ./utils.js /app/

CMD ["npm", "test"]