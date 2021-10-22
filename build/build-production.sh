#!/bin/bash

baseDir="$(pwd)"

echo Building Server ..
cd src/server
npm i

cd "$baseDir"

echo Building Client ..
cd src/client
npm i
npm run build

cd "$baseDir"

echo Bundling App ..
cd src
rm -f ../app-bundle.zip
zip -r ../app-bundle.zip . -x "**/.env" "**/.eslintcache" "**/.eslintrc.js" "client/src/*" "client/public/*" "**/node_modules/*" "**/.git/*" "**/.DS_Store"