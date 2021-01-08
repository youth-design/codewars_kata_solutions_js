const {expect, test} = require("@jest/globals");

const variance = require('../Calculate_variance/index');

const tests = [
    [[1,2,2,3], 0.5],
    [[-10, 0, 10, 20, 30], 200.0000]
]


test("Calculate Variance", () => {
    for(const [input, expected] of tests)
        expect(variance(input)).toEqual(expected);
});