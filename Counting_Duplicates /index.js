const duplicateCount = text => {
    text = text.toLowerCase().split('');
    const res = new Set();

    for(const char of text) {
        const a = text.splice(0, 1)[0];
        if(text.indexOf(a) !== -1) {
            res.add(a);
        }
    }
    return res.size;
}

module.exports = duplicateCount;