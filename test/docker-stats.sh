#!/bin/bash

usage="$(basename "$0") [-h] containername1 containername1 ..."

if [[ "$#" -eq "0" ]] ||  [[ "$1" == "-h" ]]
then
    echo "display help"
    exit
fi

grepstr=$1
elems=$1
csv="$1_mem;$1_cpu"
shift
for i in $*; do 
   grepstr=$grepstr'\|'$i
   elems="$elems $i"
   csv="$csv;${i}_mem;${i}_cpu;"
done

echo "date;$csv"
while true
do
    dstats="`docker stats --no-stream --format '{{.Name}}|{{.MemUsage}}|{{.CPUPerc}}|' | grep ${grepstr}`"
    csv=$(date +%F_%T);
    for element in $elems
    do
      stats=`echo "$dstats" | grep $element | tr -d '\n\r\t '`
      mem=`echo $stats | cut -d "|" -f2 | cut -d "/" -f1`
      cpu=`echo $stats | cut -d "|" -f3`
      csv="$csv;$mem;$cpu"
    done
    echo $csv
    sleep 3
done

