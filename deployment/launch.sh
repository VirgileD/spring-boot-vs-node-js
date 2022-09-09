#!/bin/sh

type=$1 # either node or spring
if [ "x$type" != "xspring" ] && [ "x$type" != "xnodejs" ]
then
    echo "Wrong command, use: $basename nodejs|spring"
else
    docker-compose -f docker-compose-$type.yaml up --build
fi
