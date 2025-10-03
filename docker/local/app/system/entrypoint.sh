#!/bin/bash

if [ ! -d "/var/www/html/node_modules" ]; then
    npm i

fi

if [ ! -f "/var/www/html/.output/server/index.mjs" ]; then
    npm run build

fi

chown -R www-data:www-data /var/www/html

# Run the command passed as arguments to the entrypoint
exec "$@"