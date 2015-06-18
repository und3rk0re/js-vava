
var Type = {

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
    isNotInteger: function isNotIntege(value) {
        return Type.isInteger(value) !== null ? null : "Variable %% is integer"
    },

    isFloat: function isFloat(value) {
        return Type.isNumber(value) === null && Type.isInteger(value) !== null ? null : "Variable %% not a float"
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

    isNotEmptyArray: function isNotEmptyArray(value) {
        return Type.isArray(value) === null && value.length > 0 ? null : "Variable %% is not non-empty array"
    }
};

// Aliases
Type.isBool = Type.isBoolean;
Type.isInt = Type.isInteger;

module.exports = Type;