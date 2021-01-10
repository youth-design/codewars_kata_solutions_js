const simple_assembler = (program) => {
    const registers = {}
    let i = 0;
    while(i < program.length) {
        const instruction = program[i].split(' ');
        switch(instruction[0]) {
            case 'mov':
                if(typeof registers[instruction[2]] !== 'number') {
                    registers[instruction[1]] = parseInt(instruction[2]);
                } else {
                    registers[instruction[1]] = registers[instruction[2]]
                }
                break;
            case 'inc':
                registers[instruction[1]] += 1;
                break;
            case 'dec':
                registers[instruction[1]] -= 1;
                break;
            case 'jnz':
                if(registers[instruction[1]] !== 0){
                    i = i + (parseInt(instruction[2]) - 1);
                }
                break;
        }
        i += 1;
    }
    return registers
}

module.exports = simple_assembler;