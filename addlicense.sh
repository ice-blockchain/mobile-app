#!/bin/bash
declare -i files_count=0

for x in $*; 
do head -n 1 $x | diff LICENSE.header - || ( ( cat LICENSE.header; echo; cat $x) > /tmp/file; mv /tmp/file $x;
(( files_count++ ));  ) 
done
echo "Total counter: $files_count"
if [ $files_count -gt 0 ]
then
echo "There were $files_count files without license"
exit 1
fi