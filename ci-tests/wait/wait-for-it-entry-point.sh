#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

# Wait for the backend to be up, if we know where it is.
if [ -n "$HOST" ]; then
  ./wait/wait-for-it.sh "$HOST:${CUSTOMERS_PORT:-3000}" -t 1000
  #/wait-for-it.sh "$HOST:${CUSTOMERS_PORT:-3000}"
fi

# Run the main container command.
exec "$@"
