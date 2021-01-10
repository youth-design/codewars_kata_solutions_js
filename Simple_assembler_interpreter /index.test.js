const simple_assembler = require('./index');

const tests = [
    [
        ['mov a 5','inc a','dec a','dec a','jnz a -1', 'inc a'],
        {'a': 1}
    ],
    [
        [ 'mov a -10', 'mov b a', 'inc a', 'dec b', 'jnz a -2' ],
        { a: 0, b: -20 },
    ]
]

test("Simple assembler interpreter", () => {
    for(const [input, expected] of tests) {
        expect(simple_assembler(input)).toEqual(expected);
    }
})