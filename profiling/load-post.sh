#!/bin/sh

curl -X POST "http://localhost:3000/api/v1/accounts/sign-in"  -H "Content-Type: application/json" -d @./user.json --cookie ./cookies.txt --cookie-jar ./cookies.txt

for i in {1..50}
do
  RES=$(curl -X POST 'http://localhost:3000/api/v1/restaurants/717/sections/'  -H "Content-Type: application/json" -d @./section.json  --cookie ./cookies.txt --cookie-jar ./cookies.txt 2>/dev/null)
  ID=$(echo $RES | sed -E 's/\{"id":([0-9]*)\}/\1/g')
  curl -X PUT "http://localhost:3000/api/v1/restaurants/717/sections/$ID"  -H "Content-Type: application/json" -d @./section2.json  --cookie ./cookies.txt --cookie-jar ./cookies.txt 2>/dev/null >/dev/null &
  curl -X DELETE "http://localhost:3000/api/v1/restaurants/717/sections/$ID"  -H "Content-Type: application/json" --cookie ./cookies.txt --cookie-jar ./cookies.txt 2>/dev/null >/dev/null &
done
