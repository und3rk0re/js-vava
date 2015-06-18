
Simple, clean and efficient variable validator for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]
  
```js

var Vava = require('vava');

function updateUserName(id, name)
{
    Vava.Check.Assert(id, "id", [Vava.Type.isInt]);
    Vava.Check.Assert(name, "name", [Vava.Type.isString]);
    
    // Some code
}

```

## Installation

```bash
$ npm install vava
```  
  
## Bundled assertions
  
* Type.isNumber
* Type.isInt
* Type.isFloat
* Type.isBoolean
* Type.isNull
* Type.isFunction
* Type.isArray
* Type.isNotEmptyArray
* Net.isIp
* Net.isIpv4
* Net.isIpv6
* String.isHexadecimal
* String.isJson
  
  
[npm-image]: https://img.shields.io/npm/v/vava.svg
[npm-url]: https://npmjs.org/package/vava
[travis-image]: https://travis-ci.org/und3rk0re/js-vava.svg
[travis-url]: https://travis-ci.org/und3rk0re/js-vava