
Simple, clean and efficient variable validator for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]


Full syntax:

```js
var Vava = require('vava');

function updateUserName(id, name)
{
    Vava.Check.Is(id, "id", Vava.Type.isInt);
    Vava.Check.Is(name, "name", Vava.Type.isString, Vava.String.isNotEmptyOrWhitespace);
    
    // Some code
}
```

Short syntax - methods from `Check` are imported to container

```js
var Vava = require('vava');

function updateUserName(id, name)
{
    Vava.Is(id, "id", Vava.Type.isInt);
    Vava.Is(name, "name", Vava.Type.isString, Vava.String.isNotEmptyOrWhitespace);
    
    // Some code
}
```

Shortest syntax - container by itself is instance of `Check.Is` method

```js
var Vava = require('vava');

function updateUserName(id, name)
{
    Vava(id, "id", Vava.Type.isInt);
    Vava(name, "name", Vava.Type.isString, Vava.String.isNotEmptyOrWhitespace);
    
    // Some code
}
```


## Installation

```bash
$ npm install vava
```  
  
## Bundled assertions
  
* Type.is[Not]Number
* Type.is[Not]Integer
* Type.is[Not]Float
* Type.is[Not]Boolean
* Type.is[Not]Null
* Type.is[Not]Function
* Type.is[Not]Array
* Type.isNotEmptyArray
* Net.isIp
* Net.isIpv4
* Net.isIpv6
* String.is[Not]Empty
* String.isNotEmptyOrWhitespace
* String.isHexadecimal
* String.isJson
* String.isAscii[OrEmpty]
* String.isMultibyte[OrEmpty]
* String.withExactLength(length)
* String.withLength(max[, min])
  
  
[npm-image]: https://img.shields.io/npm/v/vava.svg
[npm-url]: https://npmjs.org/package/vava
[travis-image]: https://travis-ci.org/und3rk0re/js-vava.svg
[travis-url]: https://travis-ci.org/und3rk0re/js-vava
