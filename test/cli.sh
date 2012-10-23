#!/bin/bash
echo -e "bin/compair Shows help text"
bin/compair
if [ $? -eq 0 ]
    then echo 'FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi

echo -e "bin/compair --url=file://$PWD/test/index.html --comp=test/tmp/test -b
\nSets baseline"
bin/compair --url=file://$PWD/test/index.html --comp=test/tmp/test -b
if [ $? -eq 1 ]
    then echo 'FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi


echo -e "bin/compair --url=file://$PWD/test/index.html --comp=test/tmp/test
\nCompare's same to  baseline"
bin/compair --url=file://$PWD/test/index.html --comp=test/tmp/test
if [ $? -eq 1 ]
    then echo 'FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi



echo -e "bin/compair --url=file://$PWD/test/index2.html --comp=test/tmp/test
\nCompare's different to  baseline"
bin/compair --url=file://$PWD/test/index2.html --comp=test/tmp/test
if [ $? -eq 0 ]
    then echo 'FAIL!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
fi
