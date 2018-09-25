FROM repo.adeo.no:5443/pus/decorator:78.20180925.0917
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./dist /app
COPY ./VERSION /app/VERSION
COPY ./proxy.json /proxy.json