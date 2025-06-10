document.addEventListener('DOMContentLoaded', () => {

    // --- CONFIGURAÇÃO DO ENIGMA ---
    const CORRECT_ANSWERS = {
        date: "12/12/1987",
        place: "300,950",
        time: "22:17",
        name: "Marina Medeiros"
    };
    let nameAttempts = 2; // Número de tentativas para o nome
    // ---------------------------------

    // Pega os elementos do HTML
    const confirmButton = document.getElementById('confirm-button');
    const successMessage = document.getElementById('success-message');
    const attemptsMessage = document.getElementById('attempts-message'); // Pega a nova div

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

    const addResetListener = (inputElement, statusElement) => {
        inputElement.addEventListener('input', () => {
            if (!inputElement.disabled) {
                statusElement.classList.remove('correct', 'incorrect');
            }
        });
    };

    addResetListener(dateInput, dateStatus);
    addResetListener(placeInput, placeStatus);
    addResetListener(timeInput, timeStatus);
    addResetListener(nameInput, nameStatus);


    const checkAnswer = (inputElement, statusElement, correctAnswer, nextGroup) => {
        if (inputElement.value.trim() === correctAnswer) {
            statusElement.classList.remove('incorrect');
            statusElement.classList.add('correct');
            inputElement.disabled = true;

            if (nextGroup) {
                nextGroup.classList.remove('hidden');
                // Se o próximo grupo for o do NOME, mostra a mensagem de tentativas
                if (nextGroup === nameGroup) {
                    attemptsMessage.textContent = `Atenção: Você tem apenas ${nameAttempts} tentativas.`;
                    attemptsMessage.classList.remove('hidden');
                }
            } else {
                successMessage.classList.remove('hidden');
                confirmButton.classList.add('hidden');
                attemptsMessage.classList.add('hidden');
            }
            return true; // Retorna sucesso
        } else {
            statusElement.classList.remove('correct');
            statusElement.classList.add('incorrect');
            return false; // Retorna falha
        }
    };

    confirmButton.addEventListener('click', () => {
        // Lógica para os primeiros campos
        if (!dateGroup.classList.contains('hidden') && !dateInput.disabled) {
            checkAnswer(dateInput, dateStatus, CORRECT_ANSWERS.date, placeGroup);
        } else if (!placeGroup.classList.contains('hidden') && !placeInput.disabled) {
            checkAnswer(placeInput, placeStatus, CORRECT_ANSWERS.place, timeGroup);
        } else if (!timeGroup.classList.contains('hidden') && !timeInput.disabled) {
            checkAnswer(timeInput, timeStatus, CORRECT_ANSWERS.time, nameGroup);
        
        // Lógica especial de tentativas para o campo NOME
        } else if (!nameGroup.classList.contains('hidden') && !nameInput.disabled) {
            const isCorrect = (nameInput.value.trim() === CORRECT_ANSWERS.name);

            if (isCorrect) {
                // Se acertar, segue o fluxo normal de sucesso
                checkAnswer(nameInput, nameStatus, CORRECT_ANSWERS.name, null);
            } else {
                // Se errar, decrementa as tentativas
                nameAttempts--;
                nameStatus.classList.add('incorrect');
                nameInput.value = ""; // Limpa o campo para a próxima tentativa

                if (nameAttempts <= 0) {
                    // Se acabarem as tentativas
                    attemptsMessage.textContent = "Tentativas esgotadas. Acesso bloqueado.";
                    attemptsMessage.style.color = "#e74c3c"; // Mensagem de erro em vermelho
                    attemptsMessage.style.borderColor = "#c0392b";
                    nameInput.placeholder = "ACESSO BLOQUEADO";
                    nameInput.disabled = true;
                    confirmButton.disabled = true; // Desabilita o botão
                } else {
                    // Se ainda houver tentativas
                    const plural = nameAttempts > 1 ? 's' : '';
                    attemptsMessage.textContent = `Incorreto. Você tem mais ${nameAttempts} tentativa${plural}.`;
                }
            }
        }
    });
});