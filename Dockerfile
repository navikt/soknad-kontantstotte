FROM repo.adeo.no:5443/pus/decorator:76.20180918.1923
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./dist /app
COPY ./VERSION /app/VERSION
ADD proxy.json /proxy.json