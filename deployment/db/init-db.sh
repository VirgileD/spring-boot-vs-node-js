#!/bin/bash
set -e

sleep 30

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL

CREATE SCHEMA library 
AUTHORIZATION postgres;

CREATE SEQUENCE library.books_book_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 2147483647
    CACHE 1;
   
CREATE TABLE library.books
(
    book_id integer NOT NULL DEFAULT nextval('library.books_book_id_seq'::regclass),
    title text COLLATE pg_catalog."default" NOT NULL,
    author text COLLATE pg_catalog."default" NOT NULL,
    isbn text COLLATE pg_catalog."default" NOT NULL,
    year integer NOT NULL,
    CONSTRAINT books_pkey PRIMARY KEY (book_id)
);

	
EOSQL