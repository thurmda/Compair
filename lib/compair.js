var util = require('util'),
    fs = require('fs'),
    exec = require('child_process').exec,
    phantom = require('phantom');
var im = require('node-imagemagick');

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
                   //new Compairison(fileName, compName)
                            //.checkSize()
                            //.crop()
                            //.compare()
                            //.finish(callback);
                   //new Compairison(fileName, compName, callback);
                }else{
                    callback();
                }
            });
        });
    });
}

function compare (path1, path2, callback){
    //TODO figure out why phantomjs still working on the file...
    var image = {};

    
    function checkSize(img, path, cb){
        im.identify(path, function(err, features){
          if (err) throw err;
            image[img] = {width: features.width, height: features.height};
            cb();
        });
    }
    function checkpoint(){
        if(image.baseline && image.current){
            if(image.baseline.height !== image.current.height){
                im.crop({
                    srcPath: path2 + option.extension,
                    dstPath: path2 + option.extension,
                    width: image.baseline.width,
                    height: image.baseline.height
                }, _compare);
            }else{
                _compare();
            }
        }
    }
    function _compare(){
       var cmd = 'compare -metric AE' +
                       ' ' + path1 + option.extension +
                       ' ' + path2 + option.extension +
                       ' ' + path1 + '-diff' + option.extension;

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
    }
   
    setTimeout(function(){
        checkSize('baseline', path1 + option.extension, checkpoint); 
        checkSize('current', path2 + option.extension, checkpoint); 
    }, 300);//OMG
    return;
}


//Compairison = function(newer, older, callback) {
    //var queue = [checkSize, crop, compare];

    //var stepped = 0;
    //function next(){
        //stepped++;
    //}
    //setTimeout(function(){
    //queue.forEach(function step(method){
        //method(next);
        //if(stepped >=queue.length){
            //callback();
        //}
    //});
    //}, 300);

    //function checkSize (){
        //console.log('checking size of ' + older);
        //return this;
    //}
    //function crop(){
        //console.log('cropping ' + newer);
        //return this;
    //}
    //function compare(){
        //console.log('comparing sized  ' + older + ' to ' + newer);
 
       //var cmd = 'compare -metric AE' +
                       //' ' + newer + option.extension +
                       //' ' + older + option.extension +
                       //' ' + newer + '-diff' + option.extension;

       //exec(cmd, function (error, stdout, stderr) {
            //console.dir(arguments);
            //if (error !== null) {
                  //console.error('Command failed: ' + cmd);
                  //console.error(error);
                  //option.exitCode++;
            //}else{
                //if(/^0/.test(stderr)){
                    //fs.unlinkSync(newer + option.extension);
                    //fs.unlinkSync(newer + '-diff' + option.extension);
                //}else{
                    ////TODO parse AE metric and compare to option.tolerance
                    //console.error(newer + option.extension +' is differnt than the baseline ' +
                                //older + option.extension + ' view the differneces here ' +
                                //newer + '-diff'+ option.extension );
                    //option.exitCode++;
                //}
            //}
       //});
       //return this;
    //}
    //this.finish =  function(callback){
        //callback();
    //}
//};

module.exports = Compair;
