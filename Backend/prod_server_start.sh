#!/bin/bash

cd ~/csci3100hiking/Backend

echo "Pulling latest code..."
git pull
echo "> npm install"
npm install
echo "Compiling TypeScript..."
tsc
echo "Stopping the correct forever process..."
forever stop build/index.js

current_timestamp=$(date +'%Y%m%d_%H%M%S')
outputlog_name="foreverlogs/${current_timestamp}_out.log"
errorlog_name="foreverlogs/${current_timestamp}_err.log"

echo "Starting a new forever process..."
forever start -o $outputlog_name -e $errorlog_name build/index.js

#See if we started the forever process successfully:
sleep 5
echo "Should have started a new forever process. Listing running forever processes:"
forever list
