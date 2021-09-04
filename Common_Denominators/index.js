const checkDelimiter = (delim, lst) => {
    return !lst.find(i => delim % i[1]);
}

const convertFrac = lst => {
    if(!lst[0]) {
        return '';
    }
    let delimiter = lst[0][1];
    let multiplier = 2;
    let foundDelimiter = false;

    do {
        if(checkDelimiter(delimiter, lst)) {
            foundDelimiter = true;
            break;
        } else {
            delimiter = lst[0][1] * multiplier;
            multiplier += 1;
        }
    } while(!foundDelimiter);

    return lst.map(i => `(${i[0] * (delimiter / i[1])},${delimiter})`).join('');
}

module.exports = { convertFrac };