#!/bin/bash

npm install

# check if any linting error
LINTRESULT=$(echo $(./node_modules/.bin/eslint app.js)+++)
if [ "$LINTRESULT" != "+++"  ]; then
  echo "LINT ERROR"
else
  echo "SUCCESS"
fi
