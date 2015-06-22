
var hexadecimal = /^[0-9A-F]+$/i,
    ascii = /^[\x00-\x7F]+$/,
    multibyte = /[^\x00-\x7F]/,
    uuid = {
        '3': /^[0-9A-F]{8}-[0-9A-F]{4}-3[0-9A-F]{3}-[0-9A-F]{4}-[0-9A-F]{12}$/i,
        '4': /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        '5': /^[0-9A-F]{8}-[0-9A-F]{4}-5[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        all: /^[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}$/i
    }
;

var String = {

    isEmpty: function isEmpty(value) {
        return typeof value === "string" && value.length === 0 ? null : "Variable %% is not empty string"
    },

    isNotEmpty: function isNotEmpty(value) {
        return typeof value === "string" && value.length > 0 ? null : "Variable %% is empty string"
    },

    isNotEmptyOrWhitespace: function isNotEmptyOrWhitespace(value) {
        return typeof value === "string" && value.trim().length > 0 ? null : "Variable %% is empty or whitespace string"
    },

    isUuid: function isUuid(value) {
        return typeof value === "string" && uuid.all.test(value) ? null : "Variable %% is not UUID"
    },
    isUuid3: function isUuid3(value) {
        return typeof value === "string" && uuid["3"].test(value) ? null : "Variable %% is not UUIDv3"
    },
    isUuid4: function isUuid4(value) {
        return typeof value === "string" && uuid["4"].test(value) ? null : "Variable %% is not UUIDv4"
    },
    isUuid5: function isUuid5(value) {
        return typeof value === "string" && uuid["5"].test(value) ? null : "Variable %% is not UUIDv5"
    },

    isJson: function isJson(value) {

        if (typeof value !== "string") {
            return "Variable %% not string and does not contain valid JSON"
        }

        try {
            JSON.parse(value);
            return null;
        } catch (e) {
            return "Variable %% does not contain valid JSON"
        }
    },

    isHexadecimal: function isHexadecimal(value) {
        return typeof value === "string" && hexadecimal.test(value) ? null : "Variable %% does not contain valid hexadecimal data"
    },

    isAscii: function isAscii(value) {
        return typeof value === "string" && ascii.test(value) ? null : "Variable %% contains multibyte characters"
    },

    isAsciiOrEmpty: function isAsciiOrEmpty(value) {
        return typeof value === "string" && (value.trim().length === 0 || ascii.test(value)) ? null : "Variable %% contains multibyte characters"
    },

    isMultibyte: function isMultibyte(value) {
        return typeof value === "string" && multibyte.test(value) ? null : "Variable %% does not contain multibyte characters"
    },

    isMultibyteOrEmpty: function isMultibyteOrEmpty(value) {
        return typeof value === "string" && (value.trim().length === 0 || multibyte.test(value)) ? null : "Variable %% does not contain multibyte characters"
    },

    withExactLength: function withExactLength(length) {
        return function withExactLengthAssertion (value) {

            if (typeof length !== "number" || length < 0) {
                return "Invalid length argument for width length check"
            }
            if (typeof value !== "string") {
                return "Variable %% is not a string"
            }

            return value.length === length
                ? null
                : "Argument %% expected to be a " + length + " char string, but " + value.length + "received"
        }
    },

    withLength: function withLength(max, min) {
        if (min > max) {
            max = [min, min = max][0];
        }

        min = min | 0;

        return function withLengthAssertion(value) {

            if (typeof max !== "number" || max < 1) {
                return "Invalid length argument for width length check"
            }

            if (typeof value !== "string") {
                return "Variable %% is not a string"
            }

            if (value.length > max) {
                return "Argument %% must have up to " + max + " chars, but " + value.length + "received"
            }

            if (min > 0 && value.length < min) {
                return "Argument %% must have at least " + min + " chars, but " + value.length + "received"
            }

            return null;
        }
    }

};

// Aliases
String.isHex = String.isHexadecimal;

module.exports = String;