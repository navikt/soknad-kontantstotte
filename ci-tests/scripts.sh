#!/bin/bash
scriptdir="$(dirname "$0")"
cd "$scriptdir"

case "$1" in
    "test")
        (
            set -e
            docker-compose -p "$2" run --rm jest-image-snapshot test
            docker-compose -p "$2" down
        )
        errorCode=$?
        if [ $errorCode -ne 0 ]; then
            docker-compose -p "$2" down
            docker run --rm -v `pwd`/reports:/upload/files navikt/docker-directory-uploader:1.0.0 https://repo.adeo.no/repository/raw/nais/soknad-kontantstotte/"$2"
            echo "Se feilrapport fra Gemini på https://repo.adeo.no/repository/raw/nais/soknad-kontantstotte/$2/gemini/index.html"
            exit $errorCode
        fi
        ;;
    "capture")
        docker-compose run --rm jest-image-snapshot update
        docker-compose down
        ;;
esac
