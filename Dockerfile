FROM repo.adeo.no:5443/pus/decorator:44.20180618.1626
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
COPY ./dist /app
COPY ./VERSION /app/VERSION
COPY ./proxy.json /app