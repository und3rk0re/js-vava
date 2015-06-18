"use strict";

/**
 * Builds and returns JavaScript error object
 *
 * @param {*}           value
 * @param {string}      name
 * @param {number|null} i
 * @param {string}      template
 * @return {Error}
 */
function buildError(value, name, i, template)
{
    if (i !== null) {
        name = name + "[" + i + "]";
    }

    var message = template.replace("%%", "`" + name + "`");

    // Resolve variable value
    if (value === null) {
        message += ". Value is null";
    } else if (typeof value === "number") {
        message += ". Value is number " + value
    } else if (typeof value === "string") {
        if (value.length > 100) {
            message += ". Value is string with length " + value.length;
        } else {
            message += ". Value is string \"" + value + "\"";
        }
    }

    return new Error(message);
}

var Check = {

    /**
     * Performs assertion against various rules
     *
     * @param {*}          value
     * @param {string}     name
     * @param {function[]} assertions
     */
    Assert: function Assert(value, name, assertions) {
        if (arguments.length > 3 && !Array.isArray(assertions)) {
            assertions = Array.prototype.slice.call(arguments, 2);
        }
        if (!Array.isArray(assertions)) {
            assertions = [assertions];
        }

        var arrayMode = Array.isArray(value);
        if (!arrayMode) {
            value = [value];
        }

        var i, j, r;

        for (i=0; i < value.length; i++) {
            for (j=0; j < assertions.length; j++) {
                if (r = assertions[j](value[i])) {
                    throw buildError(value[i], name, arrayMode ? i : null, r);
                }
            }
        }
    },

    /**
     * Validates incoming data and returns TRUE if value survives
     *
     * @param {*}          value
     * @param {string}     name
     * @param {function[]} assertions
     *
     * @return {boolean}
     */
    Validate: function Validate(value, name, assertions) {
        if (arguments.length > 3 && !isArray(assertions)) {
            assertions = Array.prototype.slice.call(arguments, 2);
        }
        if (!Array.isArray(assertions)) {
            assertions = [assertions];
        }

        var arrayMode = Array.isArray(value);
        if (!arrayMode) {
            value = [value];
        }

        var i, j, r;

        for (i=0; i < value.length; i++) {
            for (j=0; j < assertions.length; j++) {
                if (r = assertions[j](value[i])) {
                    return false;
                }
            }
        }

        return true;
    }
};

module.exports = Check;