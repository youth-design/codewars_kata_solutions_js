const breadthFirstTraversal = require('./index');

const Node = (tag, left, right) => {
    return {tag, left, right};
}

const tests = [
    [
        Node(0, Node(1, Node(3, Node(7), Node(8)), Node(4, Node(9), Node(10))), Node(2, Node(5, Node(11), Node(12)), Node(6, Node(13), Node(14)))),
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
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
