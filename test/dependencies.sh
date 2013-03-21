#!/bin/bash
echo 'Can find Node.js?'
which node
if [ $? -eq 1 ]
    then echo 'Node.js NOT FOUND'
fi

echo -e '\nCan find phantomjs?'
which phantomjs
if [ $? -eq 1 ]
    then echo 'phantomjs NOT FOUND'
fi

echo -e '\nphantomjs is version 1.8.2?'
version=`phantomjs -v`
if [ "$version" != "1.8.2" ]
    then echo "phantomjs is UNCONFIRMED version $version"
else
    echo "$version"
fi


echo -e '\nCan find Imagemagick compare?'
which compare
if [ $? -eq 1 ]
    then echo 'Imagemagick compare NOT FOUND'
fi
