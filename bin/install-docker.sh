#!/bin/bash

# Print all executed commands to the terminal
set -x

# Exit immediately if a command exits with a non-zero status
set -e

npm ci
npm run build:prod
npm prune --production

find . -maxdepth 1 ! -name . ! -name .. ! -name dist ! -name node_modules ! -name package.json -exec rm -r {} +
