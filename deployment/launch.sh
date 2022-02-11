#!/bin/sh

type=$1 # either node or spring
if [ "x$type" != "xspring" ] && [ "x$type" != "xnode" ]
then
    echo "Wrong command, use: $basename node|spring"
else
    docker-compose -f docker-compose-$type.yaml up --build
fi
