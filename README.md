# bench spring v node

forked from https://github.com/GaetanoPiazzolla/spring-boot-vs-node-js

# the thing I changed

mostly cleanup and reworking of tests

also, I really feel calculating 10000000 times "Math.atan(i) * Math.tan(i);" in the api is not very fair for nodejs

also, as I intend to run on multi-cores, I clusterized nodejs with pm2

# install

the jmeter test is cleaning the db, so jmeter must have the postgres jdbc connector installed:
```bash
cd deployment
./install-pg-jdbc.sh
```

also you will need gradle, docker, docker-compose, and if you want to run locally, node and npm

# One must build the spring app before building docker image

I had hard time trying to compile the spring project in Dockerfile - multiple problems of versionning it seems

so currently, before "deploying" with docker-compose you must build the java project:
```bash
cd spring-boot-performance
gradle build
```

# Tests

launch the project you want to bench:
```bash
cd deployment && ./launch.sh nodejs
```
or
```bash
cd deployment && ./launch.sh spring
```
then, start the tests
```bash
cd test
./launch_tests.sh
```
The csv result files will be in results/YYYYMMDD-HHSS-nodejs/ or results/YYYYMMDD-HHSS-spring/ depending on the type of project launched:
    - agg.csv: contains a record for each sample with stats
    - resources-usage.csv: contains the complete gathering of docker stats cpu/mem for the spring/node container during the test

then you can open the jmeter GUI and load the agg.csv in the each report element in the (disabled) "Post Analysis" thread group.


