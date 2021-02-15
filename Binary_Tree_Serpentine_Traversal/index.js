const serpentineTree = (tree, que = tree ? [tree] : [], n = 1, order = false) => {
    que = JSON.parse( JSON.stringify(que) );
    if(que.filter(i => !i.solved).length) {
        const item = que.filter(i => !i.solved)[0];


        if(n === que.filter(i => !i.solved).length) {
            if(order) {
                const tmp = que.slice(n * -1).reverse();
                que.splice(n * -1, n, ...tmp).map(i => i.data);
            }
            n *= 2;
            order = !order;
        }

        item.solved = true;

        if(item.left) {
            que.push(item.left);
        } else {
            n -= 1;
        }
        if(item.right) {
            que.push(item.right);
        } else {
            n -= 1;
        }

        return serpentineTree(tree, que, n, order);
    } else {
        return que ? que.map(i => i.data) : que;
    }
}

module.exports = serpentineTree;