
var Type = require('./../lib/Type');

function batch(test, valid, invalid, funcValid, funcInvalid) {
    var i;

    for (i = 0; i < valid.length; i++) {
        if (funcValid) {
            test.strictEqual(funcValid(valid[i]), null, "Direct function did not survive valid value " + valid[i] + " on index " + i);
        }
        if (funcInvalid) {
            test.notStrictEqual(funcInvalid(valid[i]), null, "Reverse function did not survive valid value " + valid[i] + " on index " + i);
        }
    }

    for (i = 0; i < invalid.length; i++) {
        if (funcValid) {
            test.notStrictEqual(funcValid(invalid[i]), null, "Direct function did not survive invalid value " + invalid[i] + " on index " + i);
        }
        if (funcInvalid) {
            test.strictEqual(funcInvalid(invalid[i]), null, "Reverse function did not survive invalid value " + invalid[i] + " on index " + i);
        }
    }
}

exports.testNulls = function testNulls(test) {

    // Batch
    batch(test, [null], [true, false, 0, 0.1, "", {}, "7"], Type.isNull, Type.isNotNull);

    // Done
    test.done();
};

exports.testNumbers = function testNumbers(test) {

    // Batch
    batch(test, [0, 1, -50, 0.2, -8.12], [true, false, null, {}, "7"], Type.isNumber, Type.isNotNumber);

    // Done
    test.done();
};

exports.testIntegers = function testIntegers(test) {

    // Alias
    test.strictEqual(Type.isInt, Type.isInteger);
    test.strictEqual(Type.isNotInt, Type.isNotInteger);

    // Batch
    batch(test, [0, 1, -50], [0.1, -5.3, true, false, null, {}, "2"], Type.isInteger, Type.isNotInteger);

    // Done
    test.done();
};

exports.testFloats = function testFloats(test) {

    // Batch
    batch(test, [0.1, 1.23, -.50], [1, -5, true, false, null, {}, "1.2"], Type.isFloat, Type.isNotFloat);

    // Done
    test.done();
};

exports.testBooleans = function testBooleans(test) {

    // Alias
    test.strictEqual(Type.isBool, Type.isBoolean);
    test.strictEqual(Type.isNotBool, Type.isNotBoolean);

    // Batch
    batch(test, [true, false], [1, -5, 0.2, null, {}, "true", "false", 0], Type.isBoolean, Type.isNotBoolean);

    // Done
    test.done();
};

exports.testStrings = function testStrings(test) {

    // Batch
    batch(test, ["", "123", "hello"], [0.1, 1, -5, true, false, null, {}], Type.isString, Type.isNotString);

    // Done
    test.done();
};

exports.testArrays = function testArrays(test) {

    // Batch
    batch(test, [[], new Array(), [1]], [0.1, 1, -5, true, false, null, {}], Type.isArray, Type.isNotArray);

    // Done
    test.done();
};

exports.testIsNotEmptyArray = function testIsNotEmptyArray(test) {

    // Batch
    batch(test, [["a"], [[]], [5]], [0.1, 1, -5, true, false, null, {}, []], Type.isNotEmptyArray);

    // Done
    test.done();
};

exports.testFunctions = function testFunctions(test) {

    // Batch
    batch(test, [function() {}, Object.toString], [0.1, 1, -5, true, false, null, {}, []], Type.isFunction, Type.isNotFunction);

    // Done
    test.done();
};