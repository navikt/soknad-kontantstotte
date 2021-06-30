FROM navikt/node-express:14-alpine
USER root
RUN apk --no-cache add curl
USER apprunner

COPY --chown=apprunner:apprunner ./ /var/server/

# Trenger å vite BASE_PATH før vi kjører webpack, siden webpack bruker DefinePlugin for å videresende basepath til frontend
ARG base_path
ENV BASE_PATH=$base_path

RUN yarn
RUN yarn build

EXPOSE 9000
CMD ["yarn", "start"]
