
Simple, clean and efficient variable validator for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
  
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
  
## Bundles assertions
  
* isInt
* isFloat
* isBoolean
* isNull
* isArray
* isNotEmptyArray
* isNumber
  
  
[npm-image]: https://img.shields.io/npm/v/vava.svg
[npm-url]: https://npmjs.org/package/vava