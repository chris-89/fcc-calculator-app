const calculator = (function(){
    let displayNumber = 0,
        op = '',
        equation = [];

    //----- cache DOM

    const   $display = $('#display-number'),
            $numbers = $('.number'),
            $operators = $('.operator'),
            $clear = $('#clear-btn'),
            $equals = $('#equal-btn'),
            $posNeg = $('#pos-neg');

    //----- END cache DOM
    //----- general functions

    const render = function(val){
        $display.text(val);
    }
    const onNum = function(event){
        const curDigit = $(event.target).text();
        if (displayNumber) {
            displayNumber += curDigit;
        } else {
            displayNumber = curDigit;
        }
        if (op) {
            equation.push(op);
            op = '';
        }
        if (equation.length < 2) {
            equation = [displayNumber];
        }
        render(displayNumber);
    }
    const onOp = function(event){
        op = $(event.target).text();
        if (displayNumber) {
                if (equation.length === 3) {
                    sum();
                    equation.push(op);
                    op = '';
                }
            }
        if(equation.length === 1) {
            equation.push(op);
            op = '';
        }
            displayNumber = '';
    }
    const clearDisplay = function(){
        displayNumber = 0;
        op = '';
        equation = [];
        render(displayNumber);
    }
    const sum = function(){

        if (equation.length === 2) {
            equation.push(displayNumber);
        }
        displayNumber = eval(equation.join(' ')).toString();
        render(displayNumber);
        equation = [displayNumber];
        displayNumber = '';
    }
    const posOrNeg = function(){
        if (displayNumber) {
            let dn = displayNumber;
                if (dn.startsWith('-')) {
                    dn = dn.substr(dn.indexOf('-')+1);
                } else {
                    dn = '-'+dn;
                }
            displayNumber = dn;
            render(dn);
            } else if (equation.length === 1) {
                let dn = equation[0];
                    if (dn.startsWith('-')) {
                        dn = dn.substr(dn.indexOf('-')+1);
                    } else {
                        dn = '-'+dn;
                    }
                equation[0] = dn;
                render(dn);
            } else {
                dn = '-';
                displayNumber = dn;
                render(dn);
            }
    }

    //----- END general functions
    //----- bind Events

    $numbers.click(event => onNum(event));
    $operators.click(event => onOp(event));
    $clear.click(clearDisplay);
    $equals.click(sum);
    $posNeg.click(posOrNeg);

    //----- END bind Events

    render(displayNumber);

})();
