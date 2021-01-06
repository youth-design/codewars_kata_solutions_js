const isShipOnCords = (field, x, y) => {
  try {
    if(field[x][y] === 1) {
      return true;
    }
  } catch(e) {}
  return false;  
}

const getShipLength = (field, x, y, length = 0) => {
  if(isShipOnCords(field, x, y)) {
    field[x][y] = 0;
    length += 1;
  }
  const status = [];
  status.push(isShipOnCords(field, x, y + 1));
  status.push(isShipOnCords(field, x + 1, y));
  status.push(isShipOnCords(field, x, y - 1));
  status.push(isShipOnCords(field, x + 1, y + 1));
  status.push(isShipOnCords(field, x + 1, y - 1));
  status.push(isShipOnCords(field, x - 1, y - 1));
  status.push(isShipOnCords(field, x - 1, y + 1));
  if(status.indexOf(true) === -1) {
    return { length, field };
  } else if(status.indexOf(true) === status.lastIndexOf(true)) {
    if(status.indexOf(true) == 0) {
      return getShipLength(field, x, y + 1, length);
    } else if(status.indexOf(true) == 1) {
      return getShipLength(field, x + 1, y, length);
    } else if(status.indexOf(true) == 2) {
      return getShipLength(field, x, y - 1, length);
    } else if(status.indexOf(true) == 3){
      return getShipLength(field, x - 1, y, length);
    } else {
      throw new Error('Ti napisal xerny, idi uchi pravila igru');
    }
  } else {
    throw new Error('Ti napisal xerny, idi uchi pravila igru');
  }
}

const getShipTypeByLength = length => {
  switch(length) {
      case 1:
        return 'submarines';
      case 2:
        return 'destroyers';
      case 3:
        return 'cruisers';
      case 4:
        return 'battleship';
  }
}

function validateBattlefield(field) {
  const neededShips = {
    battleship: 1,
    cruisers: 2,
    destroyers: 3,
    submarines: 4,
  };
  
  for(let x = 0; x < field.length; x++) {
    for(let y = 0; y < field[x].length; y++) {
      if(field[x][y] === 1) {
        try {
          const res = getShipLength(field, x, y);
          field = res.field;
          neededShips[getShipTypeByLength(res.length)] = neededShips[getShipTypeByLength(res.length)] - 1;
        } catch(err) {
          return false;
        }
      }
    }
  }
  return !Object.values(neededShips).filter(i => !!i).length;
}

module.exports = validateBattlefield;