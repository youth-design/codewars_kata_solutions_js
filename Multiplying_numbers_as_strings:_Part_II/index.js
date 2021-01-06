const setI = (arr, i, val) => {
  try {
    if(arr[i]) {
      arr[i] = parseInt(arr[i]) + parseInt(val);
    } else {
      arr[i] = val;
    }
  } catch(e) {
    console.log(e);
    arr.push(0 + val);
  }
  return arr;
}

function toFixed(num, fixed) {
    var re = new RegExp('^-?\\d+(?:\.\\d{0,' + (fixed || -1) + '})?');
    return num.toString().match(re)[0];
}

function multiply(n, o){
  let isNegative = n.indexOf('-') !== -1;
  if(isNegative) {
    isNegative = o.indexOf('-') === -1;
  } else {
    isNegative = o.indexOf('-') !== -1;
  }
  const numbersBeforeComa = n.replace(/^\-?\d*\.?/, '').length + o.replace(/^\-?\d*\.?/, '').length;
  
  n = n.replace(/[\.\-]/g, '');
  o = o.replace(/[\.\-]/g, '');
  
  while(n.length !== o.length) {
    if(n.length < o.length) 
      n = '0' + n;
    if(n.length > o.length)
      o = '0' + o;
  }
  

  let res = [];
  for(let i = o.length - 1, z = 0; i >= 0; i--, z++) {
    let line = [];
    for(let x = 0; x < z; x++)
      line.push('0');
    
    const intO = parseInt(o[i], 10);
    for(let j = n.length - 1; j >= 0; j--) {
      const intN = parseInt(n[j], 10);
      line.unshift(intO * intN);
    }
    line = line.reverse();
    line.forEach((num, ind) => {
      res = setI(res, ind, num);
    });
  }
  res.forEach((i, ind) => {
    if(i >= 10) {
      let ostatok = toFixed(i / 10) || 0;
      res[ind] = res[ind] % 10;
      res[ind + 1] = parseInt((res[ind + 1] || 0)) + parseInt(ostatok);
    }
  });

  let result = res.reverse();
  if(numbersBeforeComa)
    result.splice(result.length - numbersBeforeComa, 0, '.');
  result = result.join('');
  
  
  result = result.replace(/^(0*[1-9]+\.?)/, val => {
    return val.replace(/^0*/, '')
  });
  
  result = result.replace(/^0+\./, '0.')

  if(numbersBeforeComa)
    result = result.replace(/0*$/, '');
  
  if(result === '0.') {
    result = '0';
  } else if (isNegative) {
    result = '-' + result;
  }
  if(result[result.length - 1] === '.') {
    result = result.slice(0, -1);
  }
  
  if(result === '-')
    result = '0';
  
  return result;
}

console.log(multiply('61446827610941761627400078111648708712234291536065885283', '-16297664394775948527793469686400'));