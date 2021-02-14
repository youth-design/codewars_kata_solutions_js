const breadthFirstTraversal = (tree, que = tree ? [tree] : []) => {
    if(que.filter(i => !i.solved).length) {
        const item = que.filter(i => !i.solved)[0];
        item.solved = true;
        if(item.left) {
            que.push(item.left);
        }
        if(item.right) {
            que.push(item.right);
        }
        return breadthFirstTraversal(tree, que);
    } else {
        return que ? que.map(i => i.tag) : que;
    }
}

module.exports = breadthFirstTraversal;
