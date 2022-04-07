for x in $*; do head -$COPYRIGHTLEN $x | diff LICENSE.header - || ( ( cat LICENSE.header; echo; cat $x) > /tmp/file; mv /tmp/file $x ) done
