# Compair

Compair is a cli that will take screen shots of webpages and compare them to a
previous baseline. This can be incredibly useful when run as part of a
continous intergration system. Compair will exit with a non-zero exit code when a
comparison does not match a baseline otherwise it will exit with 0. It was designed
to be used with Jenkins so that modifications to CSS or HTML that
unintentionaly change a design could be caught imediately. It can also speed your
development of a responsive design layout.

![example](https://github.com/thurmda/compair/demo/test/tmp/compair-diff.png)

## Install

    git clone git@github.com:thurmda/Compair.git
    npm install
    npm test

## Dependencies
This project uses phantomjs and Imagemagick. test/dependencies.sh will
check for them. I recommend installing the binaries of phantomjs from
http://phantomjs.org/download.html and using a package installer to install
Imagemagick, (i.e. Mac `brew install Imagemagick')

## Usage

    Usage: compair --url=[URL] --comp=[path to comp]

    Options:
      --url        [required]
      --comp       [required]
      -b           [default: false]
      --size       [default: "1024"]
      --extension  [default: ".png"]
      --tolerance  [default: 0]
      --timeout    [default: 60000]

* --url Provide a complete URL including protocol. Notice that the tests use file://
to reach the sample pages using a full path. You can use
http://username:password@yourdomain.com/path to reach wherever you need.
* --comp Provide a base path to refer to your screen shot(s). This path will be relative
to the directory in which you run compair. If you are setting baseline images (with option
-b) then screen width will be appended to the filename after a dash. If you are running a
comparison then -timestamp-screen_width will get appended to a temporary file. If there are
no differences the temporary files will be deleted.
* -b is a flag to set compair into a baseline or comparison mode.
* --size takes a comma seperated list of screen widths you'd like to create/compare
* --tolerance is currently not implemented but is intended to be a minimum total number of
pixels allowed to be different before deeming a comparison a failure. THis could be useful
if you have a date rendered as part of your page.
* --timeout is the maximum number of milliseconds you will allow compair to execute. If
compair reaches this limit it will exit with a non-zero exit code deemed a failure.


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

Compare gitub pages for different branches of this project:

    compair --url=https://github.com/thurmda/compair/demo --comp=compair -b
    compair --url=https://github.com/thurmda/compair --comp=compair

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
