const inputBox = document.getElementById('input');
        const equalButton = document.getElementById('btn-equal');
        const signButton = document.getElementById('sign-btn');
        const plusButton = document.getElementById('btn-plus');
        const minusButton = document.getElementById('btn-minus');
        const divideButton = document.getElementById('btn-divide');
        const multiplyButton = document.getElementById('btn-multiply');

        const buttons = document.querySelectorAll('.btn');

        const number = buttons.innerHTML;
        

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                if (button.textContent === "=") {
                    const inputValue = inputBox.value

                    if (inputValue.includes('+')) {
                        const parts = inputValue.split('+')
                        const num1 = parseFloat(parts[0])
                        const num2 = parseFloat(parts[1])

                        const result = num1 + num2;
                        inputBox.value = result
                    } else if (inputValue.includes('-')){
                        const parts = inputValue.split('-')
                        const num1 = parseFloat(parts[0])
                        const num2 = parseFloat(parts[1])

                        const result = num1 - num2;
                        inputBox.value = result
                    }else if (inputValue.includes('/')) {
                        const parts = inputValue.split('/')
                        const num1 = parseFloat(parts[0])
                        const num2 = parseFloat(parts[1])

                        const result = num1 / num2;
                        inputBox.value = result
                    } else if (inputValue.includes('*')) {
                        const parts = inputValue.split('*')
                        const num1 = parseFloat(parts[0])
                        const num2 = parseFloat(parts[1])

                        const result = num1 * num2;
                        inputBox.value = result
                    } else {
                        const result = `Input Valid Number`;
                        inputBox.value = result
                    }
                   
                } else {
                    inputBox.value += button.textContent;
                }
                }
                   
            )});
      