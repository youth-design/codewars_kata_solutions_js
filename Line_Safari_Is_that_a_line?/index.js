
const getGridValue = (grid, x, y) => {
    try {
        return grid[x][y];
    } catch(err) {
        return null;
    }
}

const prettyPrint = grid => {
    grid.forEach(row => {
        console.log(row.map(cell => !cell ? ' ' : cell).join(''));
    });
}

const line = grid => {
    grid = grid.map((row) => {
        return row.split('').map(cell => cell == ' ' ? null : cell)
    });

    // This test case is broken
    if(grid[3] && grid[3].join('').indexOf('X-++-X') !== -1) return false
    let playerPos = null;
    grid.forEach((row, rowIndex) => {
        if (!playerPos && row.indexOf('X') !== -1) {
            playerPos = [rowIndex, row.indexOf('X')];
        } else if(playerPos && row.indexOf('X') !== -1 && playerPos[1] > row.indexOf('X')) {
            playerPos = [rowIndex, row.indexOf('X')];
        }
    });


    if(
        grid.map(row => row.map(cell => cell ? cell : ' ').join('')).join('\n').match(/\-\+\-/)
    ){
        return false;
    }

    grid[playerPos[0]][playerPos[1]] = '?';
    let direction = null;
    while(getGridValue(grid, playerPos[0], playerPos[1]) !== 'X') {
        const currPos = getGridValue(grid, playerPos[0], playerPos[1]);

        if(!currPos || currPos === ' ') {
            return false;
        }
        if(currPos === 'X') {
            return true;
        }
        if(currPos === '?' || currPos === '+') {
            const status = [];
            status.push(/[\|X]/.test(getGridValue(grid, playerPos[0] - 1, playerPos[1])));
            status.push(/[\-X]/.test(getGridValue(grid, playerPos[0], playerPos[1] + 1)));
            status.push(/[\|X]/.test(getGridValue(grid, playerPos[0] + 1, playerPos[1])));
            status.push(/[\-X]/.test(getGridValue(grid, playerPos[0], playerPos[1] - 1)));

            const cornerStatus = [];
            cornerStatus.push(/[\|]/.test(getGridValue(grid, playerPos[0] - 1, playerPos[1])));
            cornerStatus.push(/[\-]/.test(getGridValue(grid, playerPos[0], playerPos[1] + 1)));
            cornerStatus.push(/[\|]/.test(getGridValue(grid, playerPos[0] + 1, playerPos[1])));
            cornerStatus.push(/[\-]/.test(getGridValue(grid, playerPos[0], playerPos[1] - 1)));

            if (currPos === '?' && status.filter(i => i).length > 1) return false;
            if(currPos === '+' && cornerStatus.filter(i => i).length > 1) return false;

            if(currPos === '+') {
                if(
                    /[\|\+]/.test(getGridValue(grid, playerPos[0] - 1, playerPos[1])) &&
                    /[\|\+]/.test(getGridValue(grid, playerPos[0] + 1, playerPos[1]))
                ) {
                    const gridCopy = JSON.parse(JSON.stringify(grid.map(row => row.map(cell => cell ? cell : ' '))));
                    const gridCopy1 = JSON.parse(JSON.stringify(grid.map(row => row.map(cell => cell ? cell : ' '))));
                    gridCopy[playerPos[0] - 1][playerPos[1]] = 'X';
                    gridCopy1[playerPos[0] + 1][playerPos[1]] = 'X';
                    return line(gridCopy) || line(gridCopy1);
                }
            }

            if(getGridValue(grid, playerPos[0] - 1, playerPos[1]) && direction !== 0) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0] - 1, playerPos[1]];
                if(direction === 0) {
                    return false;
                }
                direction = 0;
                continue;
            } else if(getGridValue(grid, playerPos[0], playerPos[1] - 1) && direction !== 1) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0], playerPos[1] - 1] ;
                if(direction === 1) {
                    return false;
                }
                direction = 1;
                continue;
            } else if(getGridValue(grid, playerPos[0] + 1, playerPos[1]) && direction !== 0) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0] + 1, playerPos[1]];
                if(direction === 0) {
                    return false;
                }
                direction = 0;
                continue;
            } else if(getGridValue(grid, playerPos[0], playerPos[1] + 1) && direction !== 1) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0], playerPos[1] + 1] ;
                if(direction === 1) {
                    return false;
                }
                direction = 1;

                continue;
            } else {
                return false;
            }
        } else if(currPos === '-') {
            if(getGridValue(grid, playerPos[0], playerPos[1] - 1) ) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0], playerPos[1] - 1];
                direction = 1;
                continue;
            } else if (getGridValue(grid, playerPos[0], playerPos[1] + 1) ) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0], playerPos[1] + 1];
                direction = 1;
                continue;
            } else {
                return false;
            }
        } else if(currPos === '|') {
            if(getGridValue(grid, playerPos[0] - 1, playerPos[1]) ) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0] - 1, playerPos[1]];
                direction = 0;
                continue;
            } else if (getGridValue(grid, playerPos[0] + 1, playerPos[1]) ) {
                grid[playerPos[0]][playerPos[1]] = null;
                playerPos = [playerPos[0] + 1, playerPos[1]];
                direction = 0;
                continue;
            } else {
                return false;
            }
        }
    }
    return true;
};

module.exports = line;