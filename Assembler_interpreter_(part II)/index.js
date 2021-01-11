const registers = {};

function toFixed(num, fixed) {
    const re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

const jOperations = (program, it, instruction) => {
    program = [...program];
    const condition = instruction[0] !== 'jmp' ? program[it - 1].split(/cmp\s*/)[1].split(',').map(i => i.trim()) : null;
    let flag = false;
    switch (instruction[0]) {
        case 'je':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) === (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jne':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) !== (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jl':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) < (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jle':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) <= (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jg':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) > (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jge':
            if(
                (registers[condition[0]] || parseInt(condition[0]) || 0) >= (registers[condition[1]] || parseInt(condition[1]) || 0)
            ) {
                flag = true;
            }
            break;
        case 'jmp':
            flag = true;
            break;

    }
    if(flag) {
        const functionName = instruction[1];
        return [program, program.indexOf(functionName + ':')];
    }
    return [program, it];
}

const assemblerInterpreter = program => {
    program = program.split('\n').map(row => row.replace(/;.*/, '').trim()).filter(row => row);

    let it = 0;
    let returnToIndexes = [];
    let message = '';

    while(program[it] !== 'end' && it < program.length) {
        const instruction = program[it].split(/[\s\,]/).filter(str => str);
        const left = instruction[1];
        const right = instruction[2];


        switch (instruction[0]) {
            case 'mov':
                if(registers[right] !== undefined) {
                    registers[left] = registers[right];
                } else {
                    registers[left] = parseInt(right);
                }
                break;
            case 'inc':
                registers[instruction[1]] += 1;
                break;
            case 'dec':
                registers[instruction[1]] -= 1;
                break;
            case 'call':
                const functionName = instruction[1];
                returnToIndexes.push(it);
                it = program.indexOf(functionName + ':');
                break;
            case 'ret':
                it= returnToIndexes.pop();
                break;
            case 'msg':
                message = "";
                const output = program[it].split(/msg\s/)[1];
                for(let i = 0, isStaticOutput = false; i < output.length; i++) {
                    if(output[i] === "'") {
                        isStaticOutput = !isStaticOutput;
                    } else {
                        if(isStaticOutput) {
                            message += output[i];
                        } else {
                            if(/[\,\s]/.test(output[i])) continue;
                            message += registers[output[i]];
                        }
                    }
                }
                break;
            case 'div':
                if(registers[right] !== undefined) {
                    registers[left] = toFixed( registers[left] / registers[right] );
                } else {
                    registers[left] = toFixed(registers[left] / right);
                }
                break;
            case 'add':
                if(registers[right] !== undefined) {
                    registers[left] += registers[right];
                } else {
                    registers[left] += parseInt(right);
                }
                break;
            case 'sub':
                if(registers[right] !== undefined) {
                    registers[left] -= registers[right];
                } else {
                    registers[left] -= right;
                }
                break;
            case 'mul':
                if(registers[right] !== undefined) {
                    registers[left] *= registers[right];
                } else {
                    registers[left] *= right;
                }
                break;
            case 'jne':
            case 'jl':
            case 'jle':
            case 'jmp':
            case 'jg':
            case 'jge':
            case 'je':
                const [_program, _it] = jOperations(program, it, instruction);
                program = _program;
                it = _it;
                break;
        }
        it++;
    }

    if(program[it] === 'end') {
        return message;
    }
    return -1;
}

module.exports = assemblerInterpreter;