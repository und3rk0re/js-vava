"use strict";

/**
 * Builds and returns JavaScript error object
 *
 * @param {*}           value
 * @param {string}      name
 * @param {number|null} j
 * @param {string}      template
 * @return {Error}
 */
function buildError(value, name, j, template)
{
    if (j !== null) {
        name = name + "[" + j + "]";
    }

    var message;

    message = template.replace("%%", "`" + name + "`");

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

    var err = new Error(message);
    err.details = [message];

    return err;
}

var Check = {

    /**
     * Performs assertion against various rules for single value
     *
     * @param {*}                   value
     * @param {string}              name
     * @param {function|function[]} assertions
     */
    Is: function Is(value, name, assertions) {
        if (arguments.length > 3 && !Array.isArray(assertions)) {
            assertions = Array.prototype.slice.call(arguments, 2);
        }
        if (!Array.isArray(assertions)) {
            assertions = [assertions];
        }

        var j, r;

        for (j=0; j < assertions.length; j++) {
            if (r = assertions[j](value)) {
                throw buildError(value, name, null, r);
            }
        }
    },

    /**
     * Performs assertion against various rules for single value
     *
     * @param {*[]}                 values
     * @param {string}              name
     * @param {function|function[]} assertions
     */
    Are: function Are(values, name, assertions) {
        if (arguments.length > 3 && !Array.isArray(assertions)) {
            assertions = Array.prototype.slice.call(arguments, 2);
        }
        if (!Array.isArray(assertions)) {
            assertions = [assertions];
        }
        if (!Array.isArray(values)) {
            throw buildError(values, name, null, "Values not an array");
        }

        var i, j, r, err;

        for (i = 0; i < values.length; i++) {
            for (j = 0; j < assertions.length; j++) {
                if (r = assertions[j](values[i])) {
                    var currentErr = buildError(values[i], name, null, r);
                    if (err) {
                        err.details.push(currentErr.message);
                    } else {
                        err = currentErr;
                    }
                }
            }
        }

        if (err) throw err;
    },


    /**
     * Validates incoming data and returns TRUE if value survives and FALSE otherwise
     *
     * @param {*}                   value
     * @param {function|function[]} assertions
     *
     * @return {boolean}
     */
    IsValid: function IsValid(value, assertions) {
        if (arguments.length > 2 && !Array.isArray(assertions)) {
            assertions = Array.prototype.slice.call(arguments, 1);
        }
        if (!Array.isArray(assertions)) {
            assertions = [assertions];
        }

        var j, r;

        for (j=0; j < assertions.length; j++) {
            if (r = assertions[j](value)) {
                return false;
            }
        }

        return true;
    }
};

module.exports = Check;