#!/usr/bin/env bash

source .env

ExecuteImageCompression (){
  output=$(./node_modules/.bin/tinypng $file -k "${TINY_PNG_API_KEY}")
}

IterateCommitedImages (){
  for file in $(git diff --diff-filter=d --staged --name-only | grep ".png\|.jpg\|.jpeg")
  do
    echo "Crushing $file"
    ExecuteImageCompression
    git add $file;
  done
}

IterateCommitedImages
