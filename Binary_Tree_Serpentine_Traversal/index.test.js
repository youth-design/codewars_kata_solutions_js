const breadthFirstTraversal = require('./index');

const Node = (data, left, right) => {
    return {data, left, right};
}

const tests = [
    [
        Node(0, Node(1, Node(3, Node(7), Node(8)), Node(4, Node(9), Node(10))), Node(2, Node(5, Node(11), Node(12)), Node(6, Node(13), Node(14)))),
        [0, 2, 1, 3, 4, 5, 6, 14, 13, 12, 11, 10, 9, 8, 7],
    ],
    [
        null,
        [],
    ],
]

test('Breadth First Tree Traversal', () => {
    for (const [input, expected] of tests) {
        expect(breadthFirstTraversal(input)).toEqual(expected);
    }
})
