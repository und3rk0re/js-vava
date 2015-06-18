
var hexadecimal = /^[0-9A-F]+$/i;

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
    }

};

// Aliases
String.isHex = String.isHexadecimal;

module.exports = String;