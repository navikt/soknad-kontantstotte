FROM repo.adeo.no:5443/soknad/soknad-docker-builder:0.1.1 AS builder
ADD / /workspace

WORKDIR /workspace

# Dette byttes ut med et build-arg på Jenkins og er kun for å slippe å sende det inn lokalt
ARG NPM_TOKEN="faketoken"
RUN NPM_TOKEN=${NPM_TOKEN} yarn
RUN NPM_TOKEN=${NPM_TOKEN} yarn build

FROM repo.adeo.no:5443/pus/decorator:41.20180601.1450
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
COPY --from=builder /workspace/dist /app
COPY --from=builder /workspace/VERSION /app/VERSION