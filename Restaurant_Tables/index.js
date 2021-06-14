const restaurant = (a, b, t) => {
    let res = 0;
    let c = 0;
    t.forEach(i => {
        if(i === 1) {
            if(a) {
                a -= 1;
                return;
            }
            if(b) {
                b -= 1;
                c += 1;
                return;
            }
            if(c) {
                c -= 1;
                return;
            }
            res += 1;
        } else {
            if(b) {
                b -= 1;
                return;
            }
            res += 2;
        }
    });

    return res;
}

module.exports = { restaurant };