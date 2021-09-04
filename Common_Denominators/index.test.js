const Test = require("@codewars/test-compat/lib/assertions.js");
const { convertFrac } = require('./index.js');

describe("Tests", () => {
    it("test", () => {
        const lst = [ [1, 2], [1, 3], [1, 4] ]
        Test.assertEquals(convertFrac(lst), "(6,12)(4,12)(3,12)")
    });
});
