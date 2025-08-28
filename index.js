const display = document.getElementById("display");
const map = {
  "×": "*",
  "÷": "/"
};
let expr = "0"

// Change the display to use more user0-friendly symbols
function beautify(str) {
  return str
  .replace(/\*/g, "×")
  .replace(/\//g, "÷")
  .replace(/\./g, ",");
}

// Append a number or opperator to teh display
function appendToDisplay(token) {
  if (token === ',') token = '.';
  if (map[token]) token = map[token];

    const lastChar = expr.at(-1);

    if (isOperator(lastChar) && isOperator(token)) {
      expr = expr.slice(0, -1) + token;
      display.value = beautify(expr);
      return;
      }
    if (expr === "0" && token === "0") {
        return;
    } else if (expr === "0" && /^\d$/.test(token) && token !== "0") {
    expr = token;
    } else { 
        expr += token;
    }
    display.value = beautify(expr);
}

// Evaluate the expression (=)
function calculate() {
  let newExpr = expr.replace(/,/g, '.');
  newExpr = newExpr.replace(")%", ")/100");
  newExpr = newExpr.replace(/([0-9]+)%/g, "($1/100)");
  newExpr = newExpr.replace(/\(-([0-9.]+)\)/g, "-$1");
  newExpr = newExpr.replace(/×/g, "*").replace(/÷/g, "/");
  try {
    expr = eval(newExpr).toString();
    display.value = beautify(expr);
  } catch {
    display.value = "Error";
    expr = "0";
    }
}

// Check if a character is an operator 
function isOperator(ch) {
    return ch === "-" || ch === "+" || ch === "/" || ch === "*"
}

// Clear the display(AC)
function clearEveryThing() {
    expr = "0"
    display.value = "0"
}

// Change the sign (±)
function toggleSign() {
  if (expr.endsWith(")")) {
    let open = expr.lastIndexOf("(-");
    if (open !== -1) {
      let num = expr.slice(open + 2, -1);
      expr = expr.slice(0, open) + num;
    }
  } else {
    let i = expr.length - 1;
    while (i >= 0 && (expr[i] >= "0" && expr[i] <= "9" || expr[i] === ".")) {
      i--;
    }
    let num = expr.slice(i + 1);
    if (num) {
      expr = expr.slice(0, i + 1) + "(-" + num + ")";
    }
  }
  display.value = beautify(expr);
}

// Remove last symbol (⌫)
function deleteLastElement() {
  if (expr.endsWith(")")) {
    let open = expr.lastIndexOf("(-");
    if (open !== -1) {
      let num = expr.slice(open + 2, -1);
      expr = expr.slice(0, open) + num;
    } else {
      expr = expr.slice(0, -1);
    }
  } else {
    expr = expr.slice(0, -1);
  }
  if (expr === "" || expr === "-" || expr === "(-") expr = "0";
  display.value = beautify(expr);
}

// Percentages button (%)
function percent() {
  if (!expr.endsWith("%")) {
    expr += "%";
  }
  display.value = beautify(expr);
}