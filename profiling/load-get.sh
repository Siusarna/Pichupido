
for i in {1..1000}
do
  QUARY_NUM=$(shuf -i 0-19 -n 1)
  QUERY_UNPARSED=$(grep "^$QUARY_NUM::" gets.txt)
  QUERY=$(echo $QUERY_UNPARSED | sed -E "s/[0-9][0-9]?:://g")
  curl -X GET $QUERY > out.log 2>/dev/null > /dev/null &
  $QUERY
done
