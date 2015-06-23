var CreditCard = require('./../lib/CreditCard');
var batch = require('./../testutil').batch;

// All credit card numbers, used in tests, are randomly generated
// Just google "online credit card number generator"

exports.testIsCreditCard = function testIsCreditCard(test) {

    // Aliases
    test.strictEqual(CreditCard.isAmericanExpress, CreditCard.isAmex);
    test.strictEqual(CreditCard.isJcb, CreditCard.isJCB);

    // Batch common
    batch(
        test,
        [
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522",  // JCB 15
            "6759290026704921"  // Maestro
        ],
        [
            4, true, null, "H", " AA", " ", ""
        ],
        CreditCard.isCreditCard
    );

    // Batch visa
    batch(
        test,
        [
            "4929110918560456", // Visa
            "4929562658340"     // Visa 13
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522",  // JCB 15
            "6759290026704921"  // Maestro
        ],
        CreditCard.isVisa
    );

    // Batch mastercard
    batch(
        test,
        [
            "5506174487999345"  // Mastercard,
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522",  // JCB 15
            "6759290026704921"  // Maestro
        ],
        CreditCard.isMastercard
    );

    // Batch discover
    batch(
        test,
        [
            "6011263116310325" // Discover
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522"   // JCB 15

        ],
        CreditCard.isDiscover
    );

    // Batch maestro
    batch(
        test,
        [
            "6759290026704921"  // Maestro
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522"   // JCB 15
        ],
        CreditCard.isMaestro
    );

    // Batch amex
    batch(
        test,
        [
            "371900799878717"   // American Express
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522",  // JCB 15
            "6759290026704921"  // Maestro
        ],
        CreditCard.isAmex
    );

    // Batch JCB
    batch(
        test,
        [
            "3528606970918398", // JCB
            "180056677601522"   // JCB 15
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "6759290026704921"  // Maestro
        ],
        CreditCard.isJcb
    );


    // Done
    test.done();
};

exports.testIsLuhnValid = function testIsLuhnValid(test) {

    // Batch
    batch(
        test,
        [
            "4929110918560456", // Visa
            "4929562658340",    // Visa 13
            "5506174487999345", // Mastercard,
            "6011263116310325", // Discover
            "371900799878717",  // American Express
            "38913843890724",   // Diners
            "3528606970918398", // JCB
            "180056677601522"   // JSB 15
        ],
        [
            4, true, null, "H", " AA", " ", "",
            "4929110918560457",
            "4929562658341"
        ],
        CreditCard.isLuhnValid
    );

    // Done
    test.done();
};

exports.testIsBin = function testIsBin(test) {
    // Batch
    batch(
        test,
        ["123456", "654321", 223344],
        [
            4, true, null, "H", " AA", " ", "",
            "012345",
            "123-34",
            "12345"
        ],
        CreditCard.isBin
    );

    // Done
    test.done();
};

exports.testIsLast4 = function testIsLast4(test) {
    // Batch
    batch(
        test,
        ["1234", "6543", 2233],
        [
            4, true, null, "H", " AA", " ", "",
            "012345",
            "123-34",
            "12345",
            "321",
            123
        ],
        CreditCard.isLast4
    );

    // Done
    test.done();
};