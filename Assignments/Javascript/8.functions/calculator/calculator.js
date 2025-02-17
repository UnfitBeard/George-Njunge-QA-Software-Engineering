const inputBox = document.getElementById("input");
const buttons = document.querySelectorAll(".btn");

const handleButtonClick = (value) => {
    if (value === "=") {
        calculateResult();
    } else if (value === "C") {
        clearInput();
    } else {
        appendToInput(value);
    }
};

const calculateResult = () => {
    try {
        inputBox.value = eval(inputBox.value); 
    } catch (error) {
        inputBox.value = "Error";
    }
};


const clearInput = () => {
    inputBox.value = "";
};

const appendToInput = (value) => {
    inputBox.value += value;
};

buttons.forEach((button) => {
    button.addEventListener("click", () => handleButtonClick(button.textContent));
});
