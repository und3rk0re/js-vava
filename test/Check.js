
var Check = require('./../lib/Check');

exports.testIs = function testIs(test) {

    // Normal check
    test.doesNotThrow(
        function () {
            Check.Is(15, "x", function(x) { return x === 15 ? null : "Fail" });
        }
    );

    // Normal check with list of callbacks
    test.doesNotThrow(
        function () {
            var count = 0;
            var f = function(x) { count++; return x === 15 ? null : "Fail" };

            // Array syntax
            Check.Is(15, "x", [f, f, f]);
            test.strictEqual(3, count);

            // Varargs syntax
            Check.Is(15, "x", f, f, f);
            test.strictEqual(6, count);
        }
    );


    // Error - condition not met
    test.throws(
        function () {
            Check.Is(16, "x", function(x) { return x === 15 ? null : "Fail" });
        }
    );

    // Error - condition not met with list of callbacks
    test.throws(
        function () {
            Check.Is(
                16,
                "x",
                function () {return null},
                function (x) { return x === 15 ? null : "Fail" }
            );
        }
    );

    // Error - array instead of value
    test.throws(
        function () {
            Check.Is([15], "x", function(x) { return x === 15 ? null : "Fail" });
        }
    );


    // Done
    test.done();
};

exports.testAre = function testAre(test) {

    // Normal check
    test.doesNotThrow(
        function () {
            Check.Are([15, 8], "x", function(x) { return x === 15 || x === 8 ? null : "Fail" });
        }
    );

    // Normal check with list of callbacks
    test.doesNotThrow(
        function () {
            var count = 0;
            var f = function(x) { count++; return x === 15 || x === -2 ? null : "Fail" };

            // Array syntax
            Check.Are([15, -2], "x", [f, f, f, f]);
            test.strictEqual(8, count);

            // Varargs syntax
            Check.Are([-2, 15], "x", f, f);
            test.strictEqual(12, count);
        }
    );

    // Error - not array
    test.throws(
        function () {
            Check.Are(15, "x", function(x) { return x === 15 ? null : "Fail" });
        }
    );


    // Error - condition not met
    test.throws(
        function () {
            Check.Are([16], "x", function(x) { return x === 15 ? null : "Fail" });
        }
    );

    // Error - condition not met with list of callbacks
    test.throws(
        function () {
            Check.Are(
                [16],
                "x",
                function () {return null},
                function (x) { return x === 15 ? null : "Fail" }
            );
        }
    );

    // Counting details count
    test.doesNotThrow(
        function () {
            try {
                Check.Are(
                    [16],
                    "x",
                    function () {return "One"},
                    function () {return "Two"}
                );
            } catch (e) {
                test.strictEqual(e.details.length, 2);
            }
        }
    );

    // Done
    test.done();
};

exports.testValidate = function testValidate(test) {

    // Assertions
    test.strictEqual(Check.IsValid(5, function(x) {return x === 5 ? null : "x"}), true);
    test.strictEqual(Check.IsValid(5, function(x) {return x === 5 ? null : "x"}, function (x) {return x > 1 ? null : "x"}), true);
    test.strictEqual(Check.IsValid(5, [function(x) {return x === 5 ? null : "x"}, function (x) {return x > 1 ? null : "x"}]), true);

    test.strictEqual(Check.IsValid(5, function(x) {return x === 6 ? null : "x"}), false);
    test.strictEqual(Check.IsValid(5, function(x) {return x === 6 ? null : "x"}, function (x) {return x > 1 ? null : "x"}), false);
    test.strictEqual(Check.IsValid(5, function(x) {return x === 5 ? null : "x"}, function (x) {return x > 5 ? null : "x"}), false);
    test.strictEqual(Check.IsValid(5, [function(x) {return x === 6 ? null : "x"}, function (x) {return x > 1 ? null : "x"}]), false);
    test.strictEqual(Check.IsValid(5, [function(x) {return x === 5 ? null : "x"}, function (x) {return x > 5 ? null : "x"}]), false);

    // Done
    test.done();
};