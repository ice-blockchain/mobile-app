#!/bin/bash
for x in $*;
do head -n 1 $x | diff LICENSE.header - || ( ( cat LICENSE.header; echo; cat $x) > /tmp/file; mv /tmp/file $x; echo $x >> files.cnt; )
done
