FROM docker.adeo.no:5000/soknad/soknad-builder:1.2.0 AS builder
ADD / /workspace

WORKDIR /workspace

RUN yarn
# RUN yarn test
RUN yarn build

FROM docker.adeo.no:5000/pus/decorator:3.20180208.1633
ENV APPLICATION_NAME=soknad-kontantstotte
ENV APPRES_CMS_UR=https://appres.nav.no
COPY --from=builder /workspace/dist /app
COPY --from=builder /workspace/VERSION /app/VERSION