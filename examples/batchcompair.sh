#!/bin/bash
for line in $(cat $1); do 
    compair --url=$line; 
done; 
