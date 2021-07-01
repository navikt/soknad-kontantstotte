#!/bin/bash
#scriptdir="$(dirname "$0")"
#cd "$scriptdir"

case "$1" in
    "test")
        (
            set -e
            docker-compose -f docker-compose-ci.yml build # --no-cache
            docker-compose -f docker-compose-ci.yml run --rm jest-image-snapshot test
            docker-compose -f docker-compose-ci.yml down
        )
        errorCode=$?
        if [ $errorCode -ne 0 ]; then
            docker-compose -f docker-compose-ci.yml -p "$2" down
            exit $errorCode
        fi
        ;;
    "update")
        docker-compose -f docker-compose-ci.yml run --rm jest-image-snapshot update
        docker-compose down
        ;;
esac
