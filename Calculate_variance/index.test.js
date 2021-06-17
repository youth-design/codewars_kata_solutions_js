const Test = require("@codewars/test-compat/lib/assertions.js");
const { variance } = require('./index.js');

describe("Attempts to validate the  Khan example set", function() {
    var numbers1 = [-10, 0, 10, 20, 30];
    var numbers2 = [8, 9, 10, 11, 12];
    var numbers3 = [1.5, 2.5, 4, 2, 1, 1];

    it("Calculates a variance of 200 for example 1", function() {
        return Test.assertEquals(variance(numbers1).toFixed(4), "200.0000", "Variance for the first example set is not correct");
    });
    it("Calculates a variance of 2 for example 2", function() {
        return Test.assertEquals(variance(numbers2).toFixed(4), "2.0000", "Variance for the second example set is not correct");
    });
    it("Calculates a variance of 1.0833333333333333 for example 3", function() {
        return Test.assertEquals(variance(numbers3).toFixed(4), "1.0833", "Variance for the third example set is not correct");
    });
});