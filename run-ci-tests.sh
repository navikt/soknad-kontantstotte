#!/bin/bash
#scriptdir="$(dirname "$0")"
#cd "$scriptdir"

case "$1" in
    "test")
        (
            set -e
            docker-compose -f docker-compose-ci.yaml -p "$2" build
            docker-compose -f docker-compose-ci.yaml -p "$2" run --rm jest-image-snapshot test
            docker-compose -f docker-compose-ci.yaml -p "$2" down
        )
        errorCode=$?
        if [ $errorCode -ne 0 ]; then
            docker-compose -f docker-compose-ci.yaml -p "$2" down
            exit $errorCode
        fi
        ;;
    "capture")
        docker-compose -f docker-compose-ci.yaml run --rm jest-image-snapshot update
        docker-compose down
        ;;
esac
