const comp = (array1, array2) => {
    if(!array1 || !array2) {
        return false;
    }
    array1.sort((a, b) => a - b);
    array2.sort((a, b) => a - b);

    return array1.reduce((acc, item, ind) => !acc ? acc : (item ** 2) === array2[ind], true)
};

module.exports = { comp };
