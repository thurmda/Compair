var util = require('util'),
    fs = require('fs'),
    exec = require('child_process').exec,
    phantom = require('phantom');

var option;
var Compair = function(url, label, opt, callback){
    option = opt ||  {};
    option.extension = option.extension || '.png';
    option.size = option.size || [320, 768, 1024];
    //console.dir(option);
    option.exitCode = 0;

    var count = 0;
    function checkPoint(){
        count++;
        if(count>=option.size.length){
            callback(undefined, option);
        }
    }

    option.size.forEach(function(size){
        screenShot(url, size, label, checkPoint);
    });
}

function screenShot(url, size, label, callback){
    phantom.create(function(ph){
        ph.createPage(function(page){
            page.set('viewportSize', {width:size, height:1});
            page.open(url, function(status){
                var ts = (option.baseline) ? '' : '-' + (new Date()).getTime();
                var compName = label + '-'+ size;
                var fileName = label + ts + '-' + size;

                page.render(fileName + option.extension);
                ph.exit();
                if(!option.baseline){
                    compare(fileName, compName, callback);
                }else{
                    callback();
                }
            });
        });
    });
}
function compare (path1, path2, callback){
    var cmd = 'compare -metric AE' +
                       ' ' + path1 + option.extension +
                       ' ' + path2 + option.extension +
                       ' ' + path1 + '-diff' + option.extension;

    //TODO figure out why phantomjs still working on the file...
    setTimeout(function(){
        exec(cmd, function (error, stdout, stderr) {
            //console.dir(arguments);
            if (error !== null) {
                  console.error('Command failed: ' + cmd);
                  console.error(error);
                  option.exitCode++;
            }else{
                if(/^0/.test(stderr)){
                    fs.unlinkSync(path1 + option.extension);
                    fs.unlinkSync(path1 + '-diff' + option.extension);
                }else{
                    //TODO parse AE metric and compare to option.tolerance
                    console.error(path1 + option.extension +' is differnt than the baseline ' +
                                path2 + option.extension + ' view the differneces here ' +
                                path1 + '-diff'+ option.extension );
                    option.exitCode++;
                }
            }
            callback();
        });
    }, 300);
}
module.exports = Compair;
