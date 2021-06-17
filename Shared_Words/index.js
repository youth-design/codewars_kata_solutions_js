const parseString = (str) => {
    return str.toLowerCase().replace(/[\.\,]/g, '').replace(/[1-9]+\s?/g, '' ).split(' ').sort()
}

const sharedWords = (str1, str2) => {
    str1 = parseString(str1);
    str2 = parseString(str2);

    return Array.from(new Set(str1.filter(i => str2.indexOf(i) !== -1)));
}

module.exports = {sharedWords};