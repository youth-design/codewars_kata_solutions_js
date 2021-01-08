// Takes an array of numbers and returns the variance as a float.
// The array of numbers will always have at least one element in it.
const variance = (numbers) => {
    const average = numbers.reduce((acc, number) => {
        return acc + number;
    }, 0) / numbers.length;

    const result = numbers.reduce((acc, number) => {
        return acc + (number - average) ** 2
    }, 0) / numbers.length;
    return result;
};

module.exports = variance;