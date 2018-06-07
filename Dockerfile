FROM repo.adeo.no:5443/soknad/soknad-docker-builder:0.1.1 AS builder
ADD / /workspace

WORKDIR /workspace

RUN NPM_TOKEN=${NPM_AUTH} yarn
RUN NPM_TOKEN=${NPM_AUTH} yarn build

FROM repo.adeo.no:5443/pus/decorator:41.20180601.1450
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
COPY --from=builder /workspace/dist /app
COPY --from=builder /workspace/VERSION /app/VERSION