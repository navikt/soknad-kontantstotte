FROM repo.adeo.no:5443/pus/decorator:148.20181204.0919
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./dist /app
COPY ./VERSION /app/VERSION