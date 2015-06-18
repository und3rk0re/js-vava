
var String = require('./../lib/String');
var batch = require('./../testutil').batch;

exports.testIsEmpty = function testIsEmpty(test) {

    // Batch
    batch(test, [""], [4, true, null, "H", " AA", " "], String.isEmpty);
    batch(test, ["z", " ", "5"], [4, true, null, ""], String.isNotEmpty);
    batch(test, ["z", "5"], [4, true, null, "", " ", "\n", "\r", "\t"], String.isNotEmptyOrWhitespace);

    // Done
    test.done();
};

exports.testIsHex = function testIsHex(test) {

    // Alias
    test.strictEqual(String.isHex, String.isHexadecimal);

    // Batch
    batch(test, ["fa", "0A", "FFAA"], [4, true, null, "H", " AA"], String.isHexadecimal);

    // Done
    test.done();
};


exports.textIsJson = function testIsJson(test) {
    // Batch
    batch(
        test,
        ["null", "true", "false", "5", "6.2", "[]", "[true]", " {}"],
        [4, true, null, "{x: true}", "[\"x\": true]", ""],
        String.isJson
    );

    // Done
    test.done();
};