# url-regexp-split
Fast Javascript library to split an URL into its components using a one-line regular expression.

The default parse result is very similar to the [Node.js url library](https://nodejs.org/docs/latest/api/url.html#url_url_parsing), but differs in a few minor ways:

1. The `protocol` field leaves out the trailing `:`.
2. `user` and `password` fields are available, besides `auth`.
3. The leading `#` is removed from `hash`.
4. The extended parser adds a `mime` property containing the MIME type for the `pathname` part of the URL.

For a moderately long URL the basic parser is about 8-10 times faster than the Node.js library. The extended parser is still more than twice as fast as the native library. Using the raw parser instead of the basic parser is a little faster yet, about 40% faster than basic.

## Methods

Method | Arg. | Return | Description
---|---|---|---
`parse` | url | see below | Run the default (basic) parsing action.
`raw` | url | Array | Return the raw regexp result without parsing.
`basic` | url | Object | Returns an object similar to the Node.js native url class.
`extended` | url | Object | Like basic, but parses the pathname for resolvable `.` and `..` elements and saves a split array in `pathArray`. Parses `query` into `queryObj`.

## Configuration

Property | Default | Description
---|---|---
`parse` | "basic" | Set default parse action to "raw", "basic" or "extended"
`qs` | "querystringparser" | Use either [Node.js "querystring"](https://nodejs.org/api/querystring.html) or ["querystringparser"](https://www.npmjs.com/package/querystringparser)
`mime` | true | Determine the URL extension & MIME type

## Usage

```bash
npm install --save url-regexp-split
```

```javascript
var util  = require('util');
var split = require('url-regexp-split')();

url = "https://user:password@example.com:8080/api/users/get/22iohoife.extension?return=name&return=email#test"

var splitUrl = split.parse(url);

console.log(util.inspect(splitUrl, { colors: true }));
```

Resulting object:

```javascript
{ href: 'https://user:password@example.com:8080/./api/api/../users/./get/22iohoife.extension?return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3#test',
  matched: 'https://user:password@example.com:8080/./api/api/../users/./get/22iohoife.extension?return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3#test',
  protocol: 'https',
  slashes: true,
  auth: 'user:password',
  user: 'user',
  password: 'password',
  hostname: 'example.com',
  host: 'user:password@example.com:8080',
  port: '8080',
  /* The extended parser does some extra cleanup here: */
  pathname: '/api/users/get/22iohoife.extension',
  path: '/./api/api/../users/./get/22iohoife.extension?return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3#test',
  isLocal: false,
  search: '?return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3',
  query: 'return=name&return=email&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3&a[]=3',
  hash: 'test',
  /* These two properties are added by extended parsing */
  pathArray: [ 'api', 'users', 'get', '22iohoife.extension' ],
  queryObj: {
    return: [ 'name', 'email' ],
    a: [ '3', '3', '3', '3', '3', '3', '3', '3', '3', '3' ]
  }
}
```

## Examples

Two example files can be found in the `/examples` directory in this repository.

## Notes & license
This project is available on [GitHub](https://github.com/StefanHamminga/url-regexp-split.js) and [npm](https://www.npmjs.com/package/url-regexp-split).

The project is licensed as [LGPLv3](http://www.gnu.org/licenses/lgpl-3.0.html), the license file is included in the project directory.

Copyright 2015 [Stefan Hamminga](mailto:stefan@prjct.net) - [prjct.net](https://prjct.net)

The file `types.json` is part of [node mime](https://github.com/broofa/node-mime) and shared (MIT licensed) by Benjamin Thomas, Robert Kieffer
