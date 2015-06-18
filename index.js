
var Check = require('./lib/Check');

var V = Check.Is;
V.Check = Check;
V.Is = Check.Is;
V.Are = Check.Are;
V.IsValid = Check.IsValid;

V.Type = require('./lib/Type');
V.Net = require('./lib/Net');
V.String = require('./lib/String');

module.exports = V;