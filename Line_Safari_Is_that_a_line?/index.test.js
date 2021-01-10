const line = require('./index');

const tests = [
    [
        [    "           ",
            "X---------X",
            "           ",
            "           "
        ],
        true,
    ],
    [
        [
            "     ",
            "  X  ",
            "  |  ",
            "  |  ",
            "  X  "
        ],
        true,
    ]
]

test('Line Safari - Is that a line?', () => {

    for(const [input, expected] of tests)
        expect(line(input)).toEqual(expected);

})