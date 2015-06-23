"use strict";

var ccRegex = {
    common:     /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
    visa:       /^4[0-9]{12}(?:[0-9]{3})?$/,
    mastercard: /^5[1-5][0-9]{14}$/,
    amex:       /^3[47][0-9]{13}$/,
    diners:     /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
    discover:   /^65[4-9][0-9]{13}|64[4-9][0-9]{13}|6011[0-9]{12}|(622(?:12[6-9]|1[3-9][0-9]|[2-8][0-9][0-9]|9[01][0-9]|92[0-5])[0-9]{10})$/,
    jcb:        /^(?:2131|1800|35\d{3})\d{11}$/,
    maestro:    /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
    switchCard: /^(4903|4905|4911|4936|6333|6759)[0-9]{12}|(4903|4905|4911|4936|6333|6759)[0-9]{14}|(4903|4905|4911|4936|6333|6759)[0-9]{15}|564182[0-9]{10}|564182[0-9]{12}|564182[0-9]{13}|633110[0-9]{10}|633110[0-9]{12}|633110[0-9]{13}$/,
    unionPay:   /^(62[0-9]{14,17})$/,
    klc:        /^9[0-9]{15}$/,
    bcglobal:   /^(6541|6556)[0-9]{12}$/
};

var binRegex = /^[1-9]\d{5}$/;
var l4Regex = /^\d{4}$/;

var CreditCard = {

    isCreditCard: function isCreditCard(value) {
        if (typeof value !== "string") {
            return "Variable %% is not a string"
        }

        var found = false;
        for (var key in ccRegex) {
            if (ccRegex.hasOwnProperty(key) && ccRegex[key] instanceof RegExp) {
                if (ccRegex[key].test(value)) {
                    found = true;
                }
            }
        }
        if (!found) {
            return "Variable %% is not credit card number"
        }

        return null;
    },

    isLuhnValid: function isLuhnValid(value) {
        var cc = CreditCard.isCreditCard(value);
        if (cc !== null) {
            return cc;
        }

        var sum = 0, digit, tmpNum, shouldDouble;
        for (var i = value.length - 1; i >= 0; i--) {
            digit = value.substring(i, (i + 1));
            tmpNum = parseInt(digit, 10);
            if (shouldDouble) {
                tmpNum *= 2;
                if (tmpNum >= 10) {
                    sum += ((tmpNum % 10) + 1);
                } else {
                    sum += tmpNum;
                }
            } else {
                sum += tmpNum;
            }
            shouldDouble = !shouldDouble;
        }
        return (sum % 10) === 0 ? null : "Variable %% contains credit card number, that does not pass Luhn validation"
    },

    isCardOf: function isCardOf(type) {
        if (!ccRegex.hasOwnProperty(type) || !(ccRegex[type] instanceof RegExp)) {
            return function () {
                return "Unknown card type " + type
            }
        } else {
            return function (value) {
                if (typeof value !== "string") {
                    return "Variable %% is not a string"
                }

                return ccRegex[type].test(value) ? null : "Variable %% does not hold valid " + type + " card number"
            }
        }
    },

    isBin: function isBin(value) {
        return binRegex.test(value) ? null : "Variable %% does not contain valid BIN"
    },

    isLast4: function isLast4(value) {
        return l4Regex.test(value) ? null : "Variable %% does not contain valid Last4 sequence"
    }
};

// Shortcuts
CreditCard.isVisa = function isVisa(value) { return CreditCard.isCardOf('visa')(value); };
CreditCard.isMastercard = function isMastercard(value) { return CreditCard.isCardOf('mastercard')(value); };
CreditCard.isAmex = function isAmex(value) { return CreditCard.isCardOf('amex')(value); };
CreditCard.isAmericanExpress = CreditCard.isAmex;
CreditCard.isMaestro = function isMaestro(value) { return CreditCard.isCardOf('maestro')(value); };
CreditCard.isJcb = function isJcb(value) { return CreditCard.isCardOf('jcb')(value); };
CreditCard.isJCB = CreditCard.isJcb;
CreditCard.isDiscover = function isDiscover(value) { return CreditCard.isCardOf('discover')(value); };

module.exports = CreditCard;