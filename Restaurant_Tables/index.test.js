const Test = require("@codewars/test-compat/lib/assertions.js");
const {restaurant} = require('./index.js');

describe("restaurant tests", function() {
    it("basic tests", function() {
        [
            {a:1, b:2, t:[1,2,1,1], ans:0},
            {a:1, b:1, t:[1,1,2,1], ans:2},
            {a: 0, b: 2, t: [1,1,2], ans: 2},
        ].forEach(t=>
            Test.assertEquals(restaurant(t.a,t.b,t.t), t.ans, `wrong answer in test a=${t.a}, b=${t.b}, t=[${t.t}]`)
        );
    });
});