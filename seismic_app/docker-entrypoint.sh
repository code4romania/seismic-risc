#!/bin/sh
NODE_ENV=${NODE_ENV:-production}

set -eux
if [ "$NODE_ENV" != 'production' ]; then
    npm install
fi

exec "$@"
