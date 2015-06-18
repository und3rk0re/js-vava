
var Net = require('./../lib/Net');
var batch = require('./../testutil').batch;

exports.testIpv4 = function testIpv4(test) {

    // Batch
    batch(
        test,
        ["8.8.8.8", "255.255.255.255", "127.0.0.1"],
        [true, false, null, "8", "8.8.8", "8.8", "8,8,8,8", "8.8.8.8 ", " 8.8.8.8", ""],
        Net.isIpv4
    );

    // Done
    test.done();
};

exports.testIpv6 = function testIpv4(test) {

    // Alias
    test.strictEqual(Net.isIp, Net.isIpv6);

    // Batch
    batch(
        test,
        [
            "2001:0000:1234:0000:0000:C1C0:ABCD:0876",
            "2001:0:1234::C1C0:ABCD:876",
            "3ffe:b00::1:0:0:a",
            "FF02::1",
            "0000:0000:0000:0000:0000:0000:0000:0000",
            "::",
            "::ffff:192.168.1.26",
            "fe80::",
            "::ffff:192.168.1.1",
            "1:2:3:4:5::8",
            "::2:3:4:5:6:7:8",
            "::8",
            "0:0:0:0:0:0:0:0",
            "127.0.0.1"
        ],
        [
            true, false, null, "8", "8.8.8", "8.8", "8,8,8,8", "8.8.8.8 ", " 8.8.8.8", "", "---",
            "02001:0000:1234:0000:0000:C1C0:ABCD:0876",
            "2001:0000:1234:0000:00001:C1C0:ABCD:0876",
            "2001:1:1:1:1:1:255Z255X255Y255",
            "1::5:300.300.300.300",
            "1::5:3000.30.30.30",
            "1::1.2.256.4",
            "::3000.30.30.30"
        ],
        Net.isIpv6
    );

    // Done
    test.done();
};