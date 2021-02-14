const breadthFirstTraversal = require('./index');

const Node = (data, left, right) => {
    return {data, left, right};
}

const a = Node('A');
const b = Node('B');
a.left = b;
const c = Node('C');
a.right = c;
const f = Node('F');
c.left = f;
const g = Node('G');
c.right = g;
const h = Node('H');
f.left = h;
const d = Node('D');
b.left = d;
const i = Node('I');
d.right = i;
const e = Node('E');
b.right = e;
const j = Node('J');
i.left = j;
const k = Node('K');
j.right = k;

const tests = [
    [
        Node(0, Node(1, Node(3, Node(7), Node(8)), Node(4, Node(9), Node(10))), Node(2, Node(5, Node(11), Node(12)), Node(6, Node(13), Node(14)))),
        [0, 2, 1, 3, 4, 5, 6, 14, 13, 12, 11, 10, 9, 8, 7],
    ],
    [
        null,
        [],
    ],
    [
        a,
        ['A', 'C', 'B', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K']
    ]
]

test('Breadth First Tree Traversal', () => {
    for (const [input, expected] of tests) {
        expect(breadthFirstTraversal(input)).toEqual(expected);
    }
})
