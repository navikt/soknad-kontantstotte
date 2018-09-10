#!/bin/bash
scriptdir="$(dirname "$0")"
cd "$scriptdir"

case "$1" in
    "test")
        (
            set -e
            docker-compose run --rm testcafe
            docker-compose run --rm gemini test
            # docker-compose run --rm pa11y
            docker-compose down
        )
        errorCode=$?
        if [ $errorCode -ne 0 ]; then
            docker-compose down
            exit $errorCode
        fi
        ;;
    "capture")
        docker-compose run --rm gemini capture
        docker-compose down
        ;;
esac
