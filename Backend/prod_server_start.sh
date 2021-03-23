#!/bin/bash

cd ~/csci3100hiking/Backend

echo "Pulling latest code..."
git pull
echo "> npm install"
npm install
echo "Compiling TypeScript..."
tsc
echo "Stopping forever processes..."
forever stopall

current_timestamp=$(date +'%Y%m%d_%H%M%S')
outputlog_name="foreverlogs/${current_timestamp}_out.log"
errorlog_name="foreverlogs/${current_timestamp}_err.log"

echo "Starting a new forever process..."
forever start -c "node --max-old-space-size=8192" -o $outputlog_name -e $errorlog_name build/index.js

#See if we started the forever process successfully:
sleep 1
echo "Should have started a new forever process. Listing running forever processes:"
forever list
