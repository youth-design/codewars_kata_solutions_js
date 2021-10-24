const createPhoneNumber = numbers =>
    '(012) 345-6789'.replace(/(\d)/g, (num) => numbers[num]);

module.exports = { createPhoneNumber };