#!/bin/bash
scriptdir="$(dirname "$0")"
cd "$scriptdir"

case "$1" in
    "test")
        (
            set -e
            docker-compose -p "$2" run --rm testcafe
            docker-compose -p "$2" run --rm gemini test
            # docker-compose run --rm pa11y
            docker-compose -p "$2" down
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
