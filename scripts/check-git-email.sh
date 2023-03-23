#!/bin/bash

EMAIL=$(git config user.email)
if [[ $EMAIL != *"@users.noreply.github.com"* ]]; then
  echo "[INFO] Invalid email: $EMAIL"
  exit 1;
fi;