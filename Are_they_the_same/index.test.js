const {describe, it} = require("@jest/globals");
const Test = require("@codewars/test-compat/lib/assertions.js");
const { comp } = require("./index");

const tests = [
  {
    a1: [121, 144, 19, 161, 19, 144, 19, 11],
    a2: [
      11 * 11,
      121 * 121,
      144 * 144,
      19 * 19,
      161 * 161,
      19 * 19,
      144 * 144,
      19 * 19,
    ],
    result: true,
  },
  {
    a1:  [2, 3, 4, 0, 9, 10, 3, 9, 5, 0, 0],
    a2: [82, 16, 25, 9, 0, 9, 100, 4, 0, 0, 81],
    result: false,
  }
]


describe("Tests", () => {
  it("test", () => {
    for(test of tests) {
      Test.assertDeepEquals(comp(test.a1, test.a2), test.result);

    }
  });
});
