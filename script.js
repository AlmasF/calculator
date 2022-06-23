const display = document.getElementById('display')
const keyboard = document.getElementById('calc-keyboard')
let displayNum = ''
let prevNum = ''
let prevOperation = '='
let isBlocked = false

function displayOnCalc(num){
    // console.log('didDisplay')
    // console.log(num)
    if(num.toString().length > 9) {
        num = num.toString().substr(0, 9)
    }

    if(isNaN(num) || num === '') {
        //console.log('didNaN')
        num = ''
        display.innerHTML = num
        return
    }

    if(num[num.toString().length - 1] == '.') {
        display.innerHTML = parseFloat(num) + '.'
    }
    else if(num === '-'){
        display.innerHTML = '-'
    }
    else {
        display.innerHTML = parseFloat(num)
    }
}

function addDigit(num) {
    if(isBlocked){
        unblock()
    }
    
    if(displayNum === '0' || displayNum === '') {
        displayNum = num
    }
    else if(num === '-' && displayNum === '0'){
        displayNum = '-'
    }
    else if(num === '-'){
        displayNum *= -1
    }
    else if(displayNum.toString().length < 9){
        displayNum += num
        console.log(displayNum)
    }
    

    //console.log(`displayNum=${displayNum}, displayNum.length=${displayNum.length}\ndisplayNum.toString().length=${displayNum.toString().length}`)

    displayOnCalc(displayNum)
}

function unblock() {
    keyboard.innerHTML = 
    `
        <div onclick="clearDisplay()" class="not-blocked">C</div>
        <div onclick="addDigit('-')" class="not-blocked">&#177;</div>
        <div onclick="calculate('%')" class="not-blocked">%</div>
        <div onclick="calculate(oper = '/')" class="not-blocked">&#247;</div>
        <div onclick="addDigit('7')">7</div>
        <div onclick="addDigit('8')">8</div>
        <div onclick="addDigit('9')">9</div>
        <div onclick="calculate(oper = '*')" class="not-blocked">&#215;</div>
        <div onclick="addDigit('4')">4</div>
        <div onclick="addDigit('5')">5</div>
        <div onclick="addDigit('6')">6</div>
        <div onclick="calculate(oper = '-')" class="not-blocked">-</div>
        <div onclick="addDigit('1')">1</div>
        <div onclick="addDigit('2')">2</div>
        <div onclick="addDigit('3')">3</div>
        <div onclick="calculate(oper = '+')" class="not-blocked">+</div>
        <div onclick="addDigit('0')">0</div>
        <div onclick="addDigit('.')">,</div>
        <div onclick="calculate(oper = '=')" class="not-blocked">=</div>
    `
    isBlocked = false
    displayNum = ''
    prevNum = ''
    prevOperation = '='
}

function block() {
    isBlocked = true
    keyboard.innerHTML = 
    `
    <div class="blocked">C</div>
    <div class="blocked"">&#177;</div>
    <div class="blocked">%</div>
    <div class="blocked">&#247;</div>
    <div onclick="addDigit('7')">7</div>
    <div onclick="addDigit('8')">8</div>
    <div onclick="addDigit('9')">9</div>
    <div class="blocked">&#215;</div>
    <div onclick="addDigit('4')">4</div>
    <div onclick="addDigit('5')">5</div>
    <div onclick="addDigit('6')">6</div>
    <div class="blocked">-</div>
    <div onclick="addDigit('1')">1</div>
    <div onclick="addDigit('2')">2</div>
    <div onclick="addDigit('3')">3</div>
    <div class="blocked">+</div>
    <div onclick="addDigit('0')">0</div>
    <div onclick="addDigit('.')">,</div>
    <div class="blocked">=</div>
    `
}

function calculate(oper, prOp = prevOperation) {
    if(displayNum == '') {
        return
    }
    console.log(`prevNum=${prevNum}, displayNum=${displayNum}\noper=${oper}, prOp=${prOp}`)
    switch(prOp) {
        case '+':
            console.log('add')
            displayNum = parseFloat(prevNum) + parseFloat(displayNum)
            break
        case '-':
            console.log('minus')
            displayNum = parseFloat(prevNum) - parseFloat(displayNum)
            break
        case '/':
            console.log('div')
            displayNum = parseFloat(prevNum) / parseFloat(displayNum)
            if(displayNum == 'Infinity') {
                block()
            }
            break
        case '*':
            console.log('mul')
            displayNum = parseFloat(prevNum) * parseFloat(displayNum)
            break
        case '%':
            console.log('div2')
            displayNum = parseFloat(prevNum) % parseFloat(displayNum)
            break
    }
    prevOperation = oper
    console.log(displayNum)
    displayOnCalc(displayNum)
    prevNum = displayNum
    if(oper !== '='){
        tempCase = displayNum
        displayNum = ''
    }
}

function clearDisplay() {
    displayNum = ''
    console.log(displayNum)
    displayOnCalc(displayNum)
    prevNum = ''
    prevOperation = '='
}