#!/bin/bash
source .env
yarn start &

METRO_BUNDLER_PID=$!

yarn e2e-test-android-release

DETOX_EXIT_CODE=$?

kill $METRO_BUNDLER_PID

exit $DETOX_EXIT_CODE
