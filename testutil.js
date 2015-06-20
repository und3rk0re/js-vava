
exports.batch = function batch(test, valid, invalid, funcValid, funcInvalid) {
    var i, j;

    for (i = 0; i < valid.length; i++) {
        j = "(" + typeof valid[i] + ") '" + valid[i] + "'";

        if (funcValid) {
            test.strictEqual(funcValid(valid[i]), null, "Check function failed on valid value " + j + " on index " + i);
        }
        if (funcInvalid) {
            test.notStrictEqual(funcInvalid(valid[i]), null, "Reverse function failed on valid value " + j + " on index " + i);
        }
    }

    for (i = 0; i < invalid.length; i++) {
        j = "(" + typeof invalid[i] + ") '" + invalid[i] + "'";

        if (funcValid) {
            test.notStrictEqual(funcValid(invalid[i]), null, "Check function survived on invalid value " + j + " on index " + i);
        }
        if (funcInvalid) {
            test.strictEqual(funcInvalid(invalid[i]), null, "Reverse function survived on invalid value " + j + " on index " + i);
        }
    }
};