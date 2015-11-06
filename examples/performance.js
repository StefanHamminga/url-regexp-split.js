"use strict";

var split   = require('url-regexp-split')();
//var split   = require('../')();
var util    = require('util');
var nodeurl = require('url');

var runs = 250000;

var result = "";
var start, duration;

var shortUrl = "/css/main.css";
var longUrl = "https://user:password@example.com:8080/api/users/get/22iohoife.extension?return=name&return=email&active=true^roles=itil&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3#test";

console.log("\nRaw output:");
start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.raw(shortUrl);
}
duration = new Date() - start;
console.log("%d short URLs in\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.basic(shortUrl);
}
duration = new Date() - start;
console.log("%d long URLs in\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

console.log("\nBasic parsing:");
start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.raw(longUrl);
}
duration = new Date() - start;
console.log("%d short URLs in\t\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

start = new Date();
for (let i = 0; i < runs; i++) {
    result = nodeurl.parse(shortUrl);
}
duration = new Date() - start;
console.log("%d short URLs (native) in\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.basic(longUrl);
}
duration = new Date() - start;
console.log("%d long URLs in\t\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

start = new Date();
for (let i = 0; i < runs; i++) {
    result = nodeurl.parse(longUrl);
}
duration = new Date() - start;
console.log("%d long URLs (native) in\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

console.log("\nExtended parsing:");
start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.extended(shortUrl);
}
duration = new Date() - start;
console.log("%d short URLs in\t%d ms, \t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));

start = new Date();
for (let i = 0; i < runs; i++) {
    result = split.extended(longUrl);
}
duration = new Date() - start;
console.log("%d long URLs in\t%d ms,\t%d URLs/s", runs, duration, (runs*1000 / duration).toFixed(0));
