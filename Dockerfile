FROM repo.adeo.no:5443/pus/decorator:80.20180926.1033
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./dist /app
COPY ./VERSION /app/VERSION
COPY ./proxy.json /proxy.json