#!/bin/sh

nodejs=$(docker ps | grep "deployment_nodejs" | wc -l)
if [ "x$nodejs" == "x1" ]
then
    type="nodejs"
else
    type="spring-boot"
fi
echo "Lauching test over a $type project"
testdate=$(date +"%Y%m%d-%H%M")
echo "Launching docker resources gathering"
mkdir ./results/$testdate/ && ./docker-stats.sh deployment-${type}-1  > ./results/$testdate/resources-usage.csv &
sleep 5 # waiting for docker stats to issue a first run
echo "Launching jmeter test plan"
jmeter -n -t test_jmeter.jmx 

sleep 5 # waiting for docker stats to issue a last run
echo "Stopping docker resources gathering"
pkill docker-stats.sh

mv results/$testdate results/${testdate}-${type}