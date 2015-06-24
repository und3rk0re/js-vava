
# Variable Validator (vava)

Simple, clean and efficient variable validator for [node](http://nodejs.org).

[![NPM Version][npm-image]][npm-url]
[![Build status][travis-image]][travis-url]

## Example usage

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
$ npm install --save vava
```  
  
# Bundled assertions

All functions in bundled assertions returns null if provided variable satisfies function's validation logic or string with error message. This error message will be exception text when `Check.Is` invoked


## Type

Base package with basic assertions rules

### `Type.isNull` & `Type.isNotNull`

### `Type.isBoolean` & `Type.isBool` & `Type.isNotBoolean`

### `Type.isNumber` & `Type.isNotNumber`

### `Type.isInteger` & `Type.isNotInteger`

### `Type.isFloat` & `Type.isNotFloat`

### `Type.isFunction` & `Type.isNotFunction`

### `Type.isArray` & `Type.isNotArray`

### `Type.isNotEmptyArray`

This function returs `null` (which means `true`) if argument is array with length 1 or greater

### `Type.equalsTo(expected)`

Parametrized assertion, than returns `null` (which means `true`) only when validated value has same type and value with expected one.

```js
Check(x, "x", Check.Type.equalsTo(500)); // Will throw exception on any value except (number) 500
```

### `Type.isOneOf(expected)`

Parametrized assertion, than returns `null` (which means `true`) only when validated value presents in list of `expected` values

```js
Check(x, "x", Check.Type.isOneOf(["Banana", "Orange"]));
```


## Net

Package with assertion for network purposes

### `Net.isIp` with alias `Net.isIpv6`

Returns `null` (which means `true`) if provided argument is valid [IPv4][ip] or [IPv6][ip] address

### `Net.isIpv4`
  
Returns `null` (which means `true`) if provided argument is valid [IPv4][ip] address  

## String

Package with string-specific assertions

### `String.isEmpty` & `String.isNotEmpty`
  
### `String.isNotEmptyOrWhitespace`

Returns `null` (which means `true`) if provided argument is `string` and contains at least one non-whitespace  character.

### `String.isHexadecimal`

### `String.isJson`

### `String.isAscii`

Returns `null` (which means `true`) if provided argument is `string` with single-byte characters only. 
Empty string is not valid Ascii string

### `String.isAsciiOrEmpty`

Same as `String.isAscii`, but empty string counts as valid

### `String.isMultibyte`

Returns `null` (which means `true`) if provided argument is `string` with at least one multibyte character.
Empty string is not valid multibyte string

### `String.isMultibyteOrEmpty`

Same as `String.isMultibyte`, but empty string counts as valid

### `String.isUuid` & `String.isUuid3` & `String.isUuid4` & `String.isUuid5`

Returns `null` (which means `true`) if provided argument is `string` and satisfies rules for [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier)


### `String.withExactLength(length)`

Parametrized function, which returns `null` only if provided value is `string` with expected length

```js
Check(x, "x", String.withExactLength(3));
```
  
###  `String.withLength(max[, min])`

Parametrized function, which returns `null` only if provided value is `string` with expected length

```js
Check(x, "x", String.withLength(3)); // Any string with length 0, 1, 2, 3 chars
Check(x, "x", String.withLength(3, 5)); // Any string with length 3, 4, 5 chars
Check(x, "x", String.withLength(5, 3)); // Any string with length 3, 4, 5 chars
```

## CreditCard

Contains assertions for credit card validation. Works only on sanitized data, so remove spaces, dashes by yourself

**Known major card vendors**:

* **Visa** - `CreditCard.isVisa`
* **American Express** - `CreditCard.isAmex`
* **Mastercard** - `CreditCard.isMastercard`
* **Maestro** - `CreditCard.isMaestro`
* **JCB** - `CreditCard.isJcb`
* **Discover** - `CreditCard.isDiscover`


### `CreditCard.isCreditCard`

Returns `null` (which means `true`) if provided argument is `string` and holds credit card number of known vendor

### `CreditCard.isLuhnValid`

Returns `null` (which means `true`) if provided argument is `string` and holds credit card number of known vendor, plus 
credit card number passes [Luhn][luhn] validation

### `CreditCard.isBin`

Returns `null` (which means `true`) if provided argument holds something similar to BIN

### `CreditCard.isLast4`

Returns `null` (which means `true`) if provided argument holds something similar to last four digits of credit card

  
[npm-image]: https://img.shields.io/npm/v/vava.svg
[npm-url]: https://npmjs.org/package/vava
[travis-image]: https://travis-ci.org/und3rk0re/js-vava.svg
[travis-url]: https://travis-ci.org/und3rk0re/js-vava
[ip]: https://en.wikipedia.org/wiki/IP_address
[luhn]: https://en.wikipedia.org/wiki/Luhn_algorithm