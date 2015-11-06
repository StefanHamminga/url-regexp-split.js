var split       = require('url-regexp-split')();
//var split       = require('../')();
var util        = require('util');
var nativeurl   = require('url');

var urls = [
    "http://a/%%30%30",
    "img/logo.png",
    "/img/logo.png",
    "../img/logo.png",
    "///assets/font.otf",
    "//my.cdn.com/assets/font.otf",
    "https://user:password@example.com:8080/api/users/get/22iohoife.extension?return=name&return=email#test",
    "https://user:password@example.com:8080/./api/api/../users/./get/22iohoife.extension?return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3#test",
];

for (var index in urls) {
    console.log(util.inspect(split.extended(urls[index]), { colors: true }));
}
console.log("\n\n" + util.inspect(nativeurl.parse(urls[urls.length - 1]), { colors: true }));
