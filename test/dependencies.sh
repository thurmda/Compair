#!/bin/bash
echo 'Node.js is installed?'
which node
if [ $? -eq 1 ]
    then echo 'Node.js NOT FOUND'
fi

echo -e 'phantomjs is installed?'
which phantomjs
if [ $? -eq 1 ]
    then echo 'phantomjs NOT FOUND'
fi

echo -e 'Imagemagick is installed?'
which compare
if [ $? -eq 1 ]
    then echo 'IMagemagick NOT FOUND'
fi

