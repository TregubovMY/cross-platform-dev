import {MiniMaple} from "./miniMaple";

const expressionInput = document.getElementById('expression');
        const variableInput = document.getElementById('variable');
        const diffButton = document.getElementById('diffButton');
        const resultSpan = document.getElementById('result');

        diffButton.addEventListener('click', () => {
            try {
                const expression = expressionInput.value;
                const variable = variableInput.value;
                const miniMaple = new MiniMaple(expression);
                const result = miniMaple.diff(variable);
                resultSpan.textContent = result.members.join('');
            } catch (error) {
                resultSpan.textContent = 'Ошибка: ' + error.message;
            }
        });