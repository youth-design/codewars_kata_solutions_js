const chai = require("chai");
const {sharedWords} = require("./index.js");

const assert = chai.assert;
chai.config.truncateThreshold = 0;

describe("sharedWords", function() {
    it("given \This is like a test by the author.\" and \"This is the author's test-like test.\"", function() {
        assert.deepEqual(sharedWords("This is like a test by the author.", "This is the author's test-like test."), [ 'is', 'test', 'the', 'this' ]);
    });

    it("given \"This isn't a test. But, this is a test.\" and \"This isn't a test but this is also a test.\"", function() {
        assert.deepEqual(sharedWords("This isn't a test. But, this is a test.", "This isn't a test but this is also a test."), [ 'a', 'but', 'is', "isn't", 'test', 'this' ]);
    });

    it("given \"Coders coding for coders' benefit.\" and \"The coder coding for the coder's benefit.\"", function() {
        assert.deepEqual(sharedWords("Coders coding for coders' benefit.", "The coder coding for the coder's benefit."), [ 'benefit', 'coding', 'for' ]);
    });
});