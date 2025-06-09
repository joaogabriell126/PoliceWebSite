document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÃO DO ENIGMA ---
    // Altere os valores abaixo para as respostas corretas do seu enigma.
    // O texto deve ser exatamente igual, incluindo maiúsculas e minúsculas.
    const CORRECT_ANSWERS = {
        date: "12/12/2024",
        place: "Pequena floresta",
        time: "22:17",
        name: "Marina Medeiros"
    };
    // ---------------------------------

    // Pega os elementos do HTML
    const confirmButton = document.getElementById('confirm-button');

    const dateGroup = document.getElementById('date-group');
    const dateInput = document.getElementById('date-input');
    const dateStatus = document.getElementById('date-status');

    const placeGroup = document.getElementById('place-group');
    const placeInput = document.getElementById('place-input');
    const placeStatus = document.getElementById('place-status');

    const timeGroup = document.getElementById('time-group');
    const timeInput = document.getElementById('time-input');
    const timeStatus = document.getElementById('time-status');

    const nameGroup = document.getElementById('name-group');
    const nameInput = document.getElementById('name-input');
    const nameStatus = document.getElementById('name-status');

    const successMessage = document.getElementById('success-message');

    // --- NOVO CÓDIGO ADICIONADO ---
    // Função que remove o status de 'correto' ou 'incorreto' assim que o usuário digita.
    const addResetListener = (inputElement, statusElement) => {
        inputElement.addEventListener('input', () => {
            if (!inputElement.disabled) {
                statusElement.classList.remove('correct', 'incorrect');
            }
        });
    };

    // Aplica a função de reset para cada campo de input
    addResetListener(dateInput, dateStatus);
    addResetListener(placeInput, placeStatus);
    addResetListener(timeInput, timeStatus);
    addResetListener(nameInput, nameStatus);
    // --- FIM DO CÓDIGO ADICIONADO ---


    // Função para verificar a resposta e atualizar a interface
    const checkAnswer = (inputElement, statusElement, correctAnswer, nextGroup) => {
        // .trim() remove espaços em branco no início e fim
        if (inputElement.value.trim() === correctAnswer) {
            statusElement.classList.remove('incorrect');
            statusElement.classList.add('correct');
            inputElement.disabled = true; // Desativa o campo após acertar

            if (nextGroup) {
                nextGroup.classList.remove('hidden'); // Mostra o próximo campo
            } else {
                // Se não há próximo grupo, é o fim do enigma
                successMessage.classList.remove('hidden');
                confirmButton.classList.add('hidden'); // Opcional: esconde o botão
            }
        } else {
            statusElement.classList.remove('correct');
            statusElement.classList.add('incorrect');
        }
    };

    // Adiciona o evento de clique ao botão
    confirmButton.addEventListener('click', () => {
        // Verifica qual campo está visível para validar a resposta correta
        if (!dateGroup.classList.contains('hidden') && !dateInput.disabled) {
            checkAnswer(dateInput, dateStatus, CORRECT_ANSWERS.date, placeGroup);
        } else if (!placeGroup.classList.contains('hidden') && !placeInput.disabled) {
            checkAnswer(placeInput, placeStatus, CORRECT_ANSWERS.place, timeGroup);
        } else if (!timeGroup.classList.contains('hidden') && !timeInput.disabled) {
            checkAnswer(timeInput, timeStatus, CORRECT_ANSWERS.time, nameGroup);
        } else if (!nameGroup.classList.contains('hidden') && !nameInput.disabled) {
            // O "nextGroup" é nulo aqui, indicando que é a última resposta
            checkAnswer(nameInput, nameStatus, CORRECT_ANSWERS.name, null);
        }
    });

});