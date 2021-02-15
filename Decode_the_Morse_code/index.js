decodeMorse = (morseCode) => {
    return morseCode.trim().split('   ').map(i => i.split(' ').map(j => MORSE_CODE[j]).join('')).join(' ');
}