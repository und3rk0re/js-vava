
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

exports.testIsUuid = function testIsUuid(test) {

    // Batch
    batch(
        test,
        [
            "e882f056-1920-11e5-b60b-1697f925ec7b", // v1
            "1546058f-5a25-3334-85ae-e68f2a44bbaf", // v3
            "d1a85062-05f8-4bbf-9bf8-ea437629a7db", // v4
            "1546058f-5a25-5334-85ae-e68f2a44bbaf"  // v5
        ],
        [
        ],
        String.isUuid
    );
    batch(
        test,
        [
            "1546058f-5a25-3334-85ae-e68f2a44bbaf"  // v3
        ],
        [
            "e882f056-1920-11e5-b60b-1697f925ec7b", // v1
            "d1a85062-05f8-4bbf-9bf8-ea437629a7db", // v4
            "1546058f-5a25-4334-85ae-e68f2a44bbaf"  // v5
        ],
        String.isUuid3
    );
    batch(
        test,
        [
            "d1a85062-05f8-4bbf-9bf8-ea437629a7db"  // v4
        ],
        [
            "e882f056-1920-11e5-b60b-1697f925ec7b", // v1
            "1546058f-5a25-3334-85ae-e68f2a44bbaf", // v3
            "1546058f-5a25-5334-85ae-e68f2a44bbaf"  // v5
        ],
        String.isUuid4
    );
    batch(
        test,
        [
            "1546058f-5a25-5334-85ae-e68f2a44bbaf"  // v5
        ],
        [
            "e882f056-1920-11e5-b60b-1697f925ec7b", // v1
            "1546058f-5a25-3334-85ae-e68f2a44bbaf", // v3
            "d1a85062-05f8-4bbf-9bf8-ea437629a7db"  // v4
        ],
        String.isUuid5
    );

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


exports.testIsJson = function testIsJson(test) {

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

exports.testIsMultibyte = function testIsMultibyte(test) {

    // Batch
    batch(
        test,
        ["кириллица", "©˙©£™¶¬∂", "¢"],
        ["latin", "10", ""],
        String.isMultibyte
    );

    // Done
    test.done();
};

exports.testIsAscii = function testIsAscii(test) {

    // Batch
    batch(
        test,
        ["latin", "10"],
        ["кириллица", "©˙©£™¶¬∂", "¢", ""],
        String.isAscii
    );

    // Done
    test.done();
};

exports.testIsMultibyteOrEmpty = function testIsMultibyteOrEmpty(test) {

    // Batch
    batch(
        test,
        ["кириллица", "©˙©£™¶¬∂", "¢", ""],
        ["latin", "10"],
        String.isMultibyteOrEmpty
    );

    // Done
    test.done();
};

exports.testIsAsciiOrEmpty = function testIsAsciiOrEmpty(test) {

    // Batch
    batch(
        test,
        ["latin", "10", ""],
        ["кириллица", "©˙©£™¶¬∂", "¢"],
        String.isAsciiOrEmpty
    );

    // Done
    test.done();
};

exports.testWithExactLength = function testWithExactLength(test) {

    // With wrong argument
    test.notStrictEqual(null, String.withExactLength()("anything"));
    test.notStrictEqual(null, String.withExactLength([5])("anything"));
    test.notStrictEqual(null, String.withExactLength([-1])("anything"));


    // Batch
    batch(
        test,
        ["paris", "париж"],
        ["кириллица", "©˙©", "foo", "", null, false],
        String.withExactLength(5)
    );

    // Done
    test.done();
};

exports.testWithLength = function testWithLength(test) {

    // With wrong argument
    test.notStrictEqual(null, String.withLength()("anything"));
    test.notStrictEqual(null, String.withLength([5])("anything"));
    test.notStrictEqual(null, String.withLength(-1)("anything"));

    // Batch for length 2-3
    batch(
        test,
        ["qz", "эюя", "10"],
        ["кириллица", 11, "a", "fooo", ""],
        String.withLength(3, 2)
    );

    // Batch for length 2-3 (reversed arguments order check)
    batch(
        test,
        ["qz", "эюя", "10"],
        ["кириллица", 11, "a", "fooo", ""],
        String.withLength(2, 3)
    );

    // Batch for length up to 5 (no lower limit)
    batch(
        test,
        ["qz", "эюя", "10", "paris", "root", ""],
        ["кириллица", "foobar", 3],
        String.withLength(5)
    );

    // Done
    test.done();
};