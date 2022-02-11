#!/bin/sh

VERSION=42.3.2

bin=$(type jmeter | cut -d " " -f 3)
real=$(readlink -f $bin)
bin_dir=$(dirname $real)
lib=$(realpath $bin_dir/../lib)


wget https://jdbc.postgresql.org/download/postgresql-$VERSION.jar -O $lib/postgresql-42.3.2.jar

# docker exec -it db-service /bin/bash
# psql -U postgres
# select count(*) from library.books;
