let calculation = ''; 
const result = document.querySelector(".result");

function updateCalculation(number){
    if (number === 'c') {
        calculation = '';
    } else if (number === '=') {
        calculation = eval(calculation);
    } else {
        calculation += number;
    }
        result.innerHTML = calculation;
}
