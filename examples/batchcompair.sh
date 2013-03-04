#!/bin/bash
for line in $(cat $1); do 
    comp=${line/http:\/\//};
    compair -b --url=$line --comp=${comp/%\//};
done; 
