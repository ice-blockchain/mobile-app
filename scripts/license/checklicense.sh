touch files.cnt
(find . -type f \( -name "*.h" -or -name "*.cpp" -or -name "*.mm" -or -name "*.m" -or -name "*.swift" \) -path "./ios/ice/*" && \
find . -type f \( -name "*.h" -or -name "*.cpp" -or -name "*.java" -or -name "*.kt" -or -name "*.kts" -or -name "*.ktm" -or -name "*.gradle" \) -path "./android/app*" | grep -v './android/app/src/debug/java/io/ice/app/ReactNativeFlipper.java' && \
find . -type f \( -name "*.js" -or -name "*.ts" -or -name "*.tsx" \) -path "./src/*" | grep -v -E '.*\.json\.d\.ts' && \
find . -type f \( -name "*.js" -or -name "*.mjs" -or -name "*.tsx" \) -path "./scripts/*"
find . -type f \( -name "*.js" -or -name "*.ts" -or -name "*.tsx" \) -path "./test/*" ) | xargs -0 $(dirname -- "$0")/addlicense.sh
CNT_VALUE="$(wc -l < files.cnt |  tr -d ' \t\n\r' )"
if [ $((CNT_VALUE)) -gt 0 ]
then
echo "There were $CNT_VALUE files without license"
rm -rf files.cnt
exit 1
fi
rm -rf files.cnt
