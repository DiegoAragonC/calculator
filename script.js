let computation = [0];
let displayed = "";
let operations = {'add': add, 'sub': subtract, 'mult': multiply, 'divi': divide}
const opSymbols = {'add':'+', 'sub':'-', 'mult':'*', 'divi':'/'};


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(op, a, b) {
    let n1 = parseInt(a);
    let n2 = parseInt(b); 
    return op(n1, n2);
}


function setupButtons() {
    // Digit buttons
    for (let i=0; i<10; i++) {
        let btn = document.createElement('button');
        btn.classList.add('digit');
        btn.setAttribute('id', i);
        btn.textContent = i;
        digits.insertBefore(btn, digits.firstChild);
        btn.addEventListener('click', () => parseComputation(btn.id));
    }
    // Op buttons
    let ops = document.getElementById('operators').childNodes;
    ops.forEach((op) => {
        op.addEventListener('click', () => parseComputation(op.id));
    })
    // Clear button
    let clr = document.getElementById('clr');
    clr.addEventListener('click', () => clearDisplay());
}


function parseComputation(str) {
    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let compLen = computation.length;

    if (digits.includes(str)) {
        if (compLen == 1 && computation[0] == 0) {
            computation[compLen-1] = str;
        } else if (computation[compLen-1] in operations) {
            computation.push(str);
        } else {
            computation[compLen-1] += str;
        }
        refreshDisplay(computation);
    } else if (str in operations) {
        if (compLen < 3) {
            if (computation[compLen-1] in operations) {
                computation[compLen-1] = str;
            } else {
                computation.push(str);
            }
        } else {
            computation = [compute(), str];
        }
        refreshDisplay(computation);
    } else if (str == 'eq') {
        let result = compute();
        refreshDisplay([result]);
        computation = [result];
    }
    

}


function compute() {
    let result;
    if (computation.length < 3) {
        result = computation[0];
    } else {
        result = operate(operations[computation[1]], computation[0], computation[2]);
    }
    return result;
}


function refreshDisplay(dispArray) {
    let disp = document.getElementById('display');
    let str = "";
    for (let l of dispArray) {
        if (l in opSymbols) {
            str += " " + opSymbols[l];    
        } else {
            str += " " + l;
        }
    }
    disp.textContent = str;
}


function clearDisplay() {
    computation = [0];
    refreshDisplay(computation);
}


function run() {
    setupButtons();
    refreshDisplay();
}


run();
