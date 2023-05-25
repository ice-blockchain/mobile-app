#!/usr/bin/env bash

source .env

ExecuteImageCompression (){
  output=$(./node_modules/.bin/tinypng $file -k "${TINY_PNG_API_KEY}")
}

IterateStagedImages (){
  for file in $(git diff --diff-filter=d --staged --name-only | grep ".png\|.jpg\|.jpeg")
  do
    echo -e "\xf0\x9f\x96\xbc   Compressing $file"
    ExecuteImageCompression
    git add $file;
  done
}

IterateStagedImages