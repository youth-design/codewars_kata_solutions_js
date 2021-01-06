const makeOperation = (expression) => {
  const findExpression = /\(?(\-?\d+\.?\d*)([\+\-\*\/])(\-?\d+\.?\d*)\)?/;
  return expression.replace(findExpression, (...args) => {
    switch(args[2]) {
      case '+':
        return parseFloat(args[1]) + parseFloat(args[3]);
      case '-':
        return parseFloat(args[1]) - parseFloat(args[3]);
      case '*':
        return parseFloat(args[1]) * parseFloat(args[3]);
      case '/':
        return parseFloat(args[1]) / parseFloat(args[3]);
    }
  })
}

const replaceOnStep = expression => {
  expression = expression.replace(/\s/g, '');
  expression = expression.replace(/\((\-?\+?\d+\.?\d*)\)/g, '$1');
  expression = expression.replace(/([\+\-\/\*])\+/, '$1'); 
  expression = expression.replace(/\-\-/g, '+');
  expression = expression.replace(/\+\+/g, '+');
  return expression;
}

const cycleWhileRegex = (expression, regex) => {
  while(expression.match(regex)) {
    expression = expression.replace(regex, expr => {
      return makeOperation(expr);
    });
    expression = replaceOnStep(expression);
  }
  return expression;
}

const calc = (expression) => {
  expression = replaceOnStep(expression);
  const findExpression = /\([^\(^\)]*\)/;
  const findExpressionFirst = /\-?\d+\.?\d*[\*\/]\-?\d+\.?\d*/;
  const findExpressionSecond = /\-?\d+\.?\d*[\+\-]\-?\d+\.?\d*/;

  while(expression.match(findExpression)) {
    expression = expression.replace(findExpression, expr => {
      expr = cycleWhileRegex(expr, findExpressionFirst);
      expr = cycleWhileRegex(expr, findExpressionSecond);
      return makeOperation(expr);
    });
    expression = replaceOnStep(expression);
  }

  expression = cycleWhileRegex(expression, findExpressionFirst);
  expression = cycleWhileRegex(expression, findExpressionSecond);

  return parseFloat(expression);
}

console.log(calc(`123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11`))