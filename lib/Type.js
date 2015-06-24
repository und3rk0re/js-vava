
var Type = {

    equalsTo: function equalsTo(expected) {
        return function(actual) {
            return typeof expected === typeof actual && expected === actual ? null : "Variable %% must be equals to" + expected;
        }
    },

    isOneOf: function isOneOf(expected) {
        if (!Array.isArray(expected)) {
            return function () {
                return "Expected value list is not an array"
            }
        } else {
            return function (value) {
                return expected.indexOf(value) > -1 ? null : "Variable %% holds value, that not allowed by list"
            }
        }
    },

    isNull: function isNull(value) {
        return value === null ? null : "Variable %% is not null"
    },
    isNotNull: function isNotNull(value) {
        return value !== null ? null : "Variable %% is null"
    },

    isBoolean: function isBoolean(value) {
        return (typeof  value === "boolean") ? null : "Variable %% is not boolean"
    },
    isNotBoolean: function isNotBoolean(value) {
        return (typeof  value !== "boolean") ? null : "Variable %% is boolean"
    },

    isNumber: function isNumber(value) {
        return (typeof value === "number") ? null : "Variable %% is not a number"
    },
    isNotNumber: function isNotNumber(value) {
        return (typeof value !== "number") ? null : "Variable %% is a number"
    },

    isInteger: function isInteger(value) {
        if (Number.isInteger) {
            return Number.isInteger(value) ? null : "Variable %% not an integer"
        } else {
            return value === Number(value) && value % 1 === 0 ? null : "Variable %% not an integer"
        }
    },
    isNotInteger: function isNotInteger(value) {
        return Type.isInteger(value) !== null ? null : "Variable %% is integer"
    },

    isFloat: function isFloat(value) {
        return Type.isNumber(value) === null && Type.isInteger(value) !== null ? null : "Variable %% not a float"
    },
    isNotFloat: function isNotFloat(value) {
        return Type.isFloat(value) !== null ? null : "Variable is float"
    },

    isString: function isString(value) {
        return (typeof value === "string") ? null : "Variable %% is not a string"
    },
    isNotString: function isNotString(value) {
        return (typeof value !== "string") ? null : "Variable %% is a string"
    },

    isArray: function isArray(value) {
        return Array.isArray(value) ? null : "Variable %% not an array"
    },
    isNotArray: function isNotArray(value) {
        return Type.isArray(value) !== null ? null : "Variable %% is array";
    },

    isNotEmptyArray: function isNotEmptyArray(value) {
        return Type.isArray(value) === null && value.length > 0 ? null : "Variable %% is not non-empty array"
    },

    isFunction: function isFunction(value) {
        return (typeof value === "function") ? null : "Variable %% is not a function"
    },

    isNotFunction: function isNotFunction(value) {
        return (typeof value !== "function") ? null : "Variable %% is a function"
    }
};

// Aliases
Type.isBool = Type.isBoolean;
Type.isNotBool = Type.isNotBoolean;
Type.isInt = Type.isInteger;
Type.isNotInt = Type.isNotInteger;

module.exports = Type;