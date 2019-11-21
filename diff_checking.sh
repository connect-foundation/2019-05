#!/bin/bash
git diff $1 --name-only > diff.txt
IS_CLIENT_PUSHED=false
IS_SERVER_PUSHED=false
while read diff_file_name; do
 client_regx="(^client/)"
 server_regx="(^server/)"
 if [[ $diff_file_name =~ $client_regx ]]; then
   if [ $IS_CLIENT_PUSHED = false ]; then
     IS_CLIENT_PUSHED=true
   fi
 fi
 if [[ $diff_file_name =~ $server_regx ]]; then
   if [ $IS_SERVER_PUSHED = false ]; then
     IS_SERVER_PUSHED=true
   fi
 fi
done < diff.txt
rm diff.txt
echo $IS_CLIENT_PUSHED,$IS_SERVER_PUSHED