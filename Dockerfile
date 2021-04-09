FROM docker.pkg.github.com/navikt/pus-decorator/pus-decorator:bb933fdabee97947acfab903ef25ccc02a11cd9d
ENV APPLICATION_NAME=soknad-kontantstotte
ENV HEADER_TYPE=WITHOUT_MENU
ENV CONTEXT_PATH=/
COPY ./production /app
