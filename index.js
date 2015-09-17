/* url-regexp-split - URL splitting library

Project information & repository:
https://github.com/StefanHamminga/url-regex-split.js

This tiny library contains

Copyright (c) Stefan Hamminga <stefan@prjct.net>, All rights reserved.

This library is free software; you can redistribute it and/or modify it under
the terms of the GNU Lesser General Public License as published by the Free
Software Foundation; either version 3.0 of the License, or (at your option) any
later version.

This library is distributed in the hope that it will be useful, but WITHOUT ANY
WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
PARTICULAR PURPOSE.  See the GNU Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public License along
with this library.
*/

var defaults = {
    parse: 'basic',
    qs: 'querystringparser' // 'querystring'
};

var split = {
    // https://regex101.com/r/eR9yG2/4
    regexp: /^((?:[\s]+)?(?:([a-z0-9.+-]+):)?(?:(\/\/)(\/|(?:(?:(([^\/:@]+)(?::([^\/@]+))?)@)?(?:([^:\/]+))(?::([1-9][0-9]*))?)(?=[\/#$?]))))?(([^#?]+)?(\?([^#]+))?(?:#([^\s]+))?(?:[\s])?)/i
};

/**
 * Returns the internal regular expression for manual labour
 * @return {RegExp} Regular expression for splitting URLs
 */
split.exp = function () {
    "use strict";
    return split.regexp;
};

/**
 * Performs the leanest way of URL processing
 * @param  {string} url URL to process
 * @return {Array}      Raw result of RegExp.exec(url)
 */
split.raw = function (url) {
    "use strict";
    return split.regexp.exec(url);
};

/**
 * Performs basic splitting and organising functions on `url`.
 * @param  {string} url URL to process
 * @return {Object}     Plain object with URL processing results
 */
split.basic = function (url) {
    "use strict";
    var raw = split.regexp.exec(url);
    return {
        href: url,
        matched: raw[0],
        protocol: raw[2],
        slashes: (typeof raw[3] !== 'undefined'),
        auth: raw[5],
        user: raw[6],
        password: raw[7],
        hostname: (raw[8] || ((raw[3] === "//") ? "localhost" : raw[8])),
        host: (raw[4] === '/') ? 'localhost' : raw[4],
        port: raw[9],
        pathname: raw[11],
        path: raw[10],
        isLocal: (typeof raw[1] === 'undefined'),
        search: raw[12],
        query: raw[13],
        hash: raw[14]
    };
};

split.extended = function(url) {
    var result = split.basic(url);
    if (result.pathname) {
        result.pathname = result.pathname.replace(/\/([^\/]+\/\.)?\.\//ig, '/');
        result.pathArray = result.pathname.replace(/(^\/)|(\/$)/, "").split('/');
    }
    if (result.search) {
        result.queryObj = split.qs.parse(result.query);
    }
    return result;
};

/**
 * Fast URL splitting and parsing library
 * @param  {Object} config  Configuration properties:
 *                         		parse: 'raw'|'basic'|'extended'
 *                         			default parse action. Default: 'basic'
 *                         		qs: 'querystring'|'querystringparser'
 *                         			parser library for query parsing.
 * @return {Object}        [description]
 */
module.exports = function(config) {
    if (config) {
        split.parse = split[config.parse || defaults.parse];
        split.qs    = require(config.qs || defaults.qs);
    } else {
        split.parse = split[defaults.parse];
        split.qs    = require(defaults.qs);
    }
    return split;
};
