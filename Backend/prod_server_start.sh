#!/bin/bash

cd ~/csci3100hiking/Backend

echo "Pulling latest code..."
git pull
echo "> npm install"
npm install
echo "Compiling TypeScript..."
npx tsc
echo "Stopping the correct PM2 process..."
pm2 stop build/index.js

current_timestamp=$(date +'%Y%m%d_%H%M%S')
#outputlog_name="foreverlogs/${current_timestamp}_out.log"
#errorlog_name="foreverlogs/${current_timestamp}_err.log"
pm2log_name="pm2_logs/${current_timestamp}.log"

echo "Starting the backend via PC2..."
pm2 start build/index.js --time --log pm2log_name
#forever start -o $outputlog_name -e $errorlog_name build/index.js

#See if we started the forever process successfully:
#sleep 5
#echo "Should have started a new PM2 process. Listing running PM2 processes:"
#forever list
#pm2 ls
