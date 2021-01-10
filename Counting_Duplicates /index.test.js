const duplicateCount = require('./index');

const tests = [
    [
        "abcde",
        0
    ],
    [
        "aabbcde",
        2
    ],
    [
        "aabBcde",
        2
    ],
    [
        "Indivisibility",
        1
    ],
    [
        "Indivisibilities",
        2
    ],
]

test("Counting Duplicates", () => {
    for(const [input, expected] of tests)
        expect(duplicateCount(input)).toEqual(expected);
})