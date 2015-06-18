
exports.batch = function batch(test, valid, invalid, funcValid, funcInvalid) {
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
};