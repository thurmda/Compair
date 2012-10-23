# Compair

Compair is a cli that will take screen shots of webpages and compare them to a
previous baseline. This can be incredibly useful when run as part of a
continous intergration system. It can also speed your development of a
responsive design layout.

## Install
    git clone <//TODO copy from github>
    npm install
    npm test

## Dependencies
This project uses phantomjs and Imagemagick. test/dependencies.sh will
check for them. I recommend installing the binaries of phantomjs from
http://phantomjs.org/download.html and using a package installer to install
Imagemagick, (i.e. Mac `brew install Imagemagick')

## Examples
I recommend putting the bin folder on your PATH so that you can run compair
from anywhere. 

Executing compair with no options will print a help message detailing all
options
    
    compair

Set a baseline image for a webpage file

    compair --url=file://$PWD/test/index.html --comp=test/tmp/readme -b


Compare a slightly different webpage to the baseline captured previously
    
    compair --url=file://$PWD/test/index2.html --comp=test/tmp/readme



Set baseline screenshots in widths for various mobile devices.
    
    compair --url=file://$PWD/test/index.html --comp=test/tmp/readme -size=320,768,1024 -b



### Links

#### Good examples of responsive design sites

* http://www.ethanmarcotte.com/
* http://forefathersgroup.com/
* http://www.gosphero.com/
* http://css-tricks.com/


#### About responsive design

* http://line25.com/tutorials/create-a-responsive-web-design-with-media-queries
* http://www.onextrapixel.com/2012/04/23/responsive-web-design-layouts-and-media-queries/
* http://css-tricks.com/snippets/css/media-queries-for-standard-devices/
* http://socialdriver.com/2012/07/20-best-responsive-websites/


#### Other projects like this
* http://www.cambus.net/creating-thumbnails-using-phantomjs-and-imagemagick/
* http://mediaqueri.es/
* http://www.imagemagick.org/script/command-line-options.php#metric
* http://www.imagemagick.org/Usage/compare/
