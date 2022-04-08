touch files.cnt
find . -type f \( -name "*.h" -or -name "*.mm" -or -name "*.m" -or -name "*.swift" \) -path "./ios/ICE/*" && find "./android" -type f \( -name "*.java" -or -name "*.kt" -or -name "*.kts" -or -name "*.ktm" \) \( ! -path "./.gradle/*" -and ! -path "./android/app/src/debug/java/com/ice/ReactNativeFlipper.java" \) && find . -type f \( -name "*.js" -or -name "*.ts" -or -name "*.tsx" \) -path "./src/*" | xargs -0 ./addlicense.sh
CNT_VALUE="$(wc -l < files.cnt |  tr -d ' \t\n\r' )"
# echo $CNT_VALUE
if [ $((CNT_VALUE)) -gt 0 ]
then
echo "There were $CNT_VALUE files without license"
rm -rf files.cnt
exit 1
fi
rm -rf files.cnt
