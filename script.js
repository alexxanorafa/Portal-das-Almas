// ============ SISTEMA DE MENU ============
const menuIcon = document.getElementById("menuIcon");
const menu = document.getElementById("menu");

menuIcon.addEventListener("click", function(e) {
    e.stopPropagation();
    menu.classList.toggle("active");
    menuIcon.classList.toggle("active");
});

document.addEventListener("click", function(e) {
    if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
        menu.classList.remove("active");
        menuIcon.classList.remove("active");
    }
});

document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("mouseenter", function() {
        this.style.transform = "translateY(-3px)";
    });
    item.addEventListener("mouseleave", function() {
        this.style.transform = "translateY(0)";
    });
});

const askButton = document.getElementById("askButton");
const questionInput = document.getElementById("question");
const responseDisplay = document.getElementById("response");
const planchette = document.getElementById("planchette");

// Respostas possíveis
const responses = [
    "SIM", "NÃO", "TALVEZ", "PERGUNTE NOVAMENTE", 
    "DEFINITIVAMENTE", "NÃO CONTE COM ISSO", "A RESPOSTA ESTÁ INCERTA",
    "COM CERTEZA", "DÚVIDAS PERSISTEM", "MELHOR NÃO DIZER AGORA"
];

// Efeito de carregamento (movimento aleatório do ponteiro)
function loadingEffect(callback) {
    let counter = 0;
    const maxMovements = 15; // Quantidade de movimentos antes de começar a resposta

    function moveRandomly() {
        if (counter >= maxMovements) {
            callback(); // Inicia a resposta após o efeito de carregamento
            return;
        }

        const randomX = Math.random() * 80 - 40; // Movimento aleatório horizontal
        const randomY = Math.random() * 80 - 40; // Movimento aleatório vertical

        planchette.style.transform = `translate(${randomX}px, ${randomY}px)`;
        counter++;
        
        setTimeout(moveRandomly, 200); // Pequena pausa antes do próximo movimento
    }

    moveRandomly();
}

// Efeito de digitação da resposta
function typeResponse(response, callback) {
    let i = 0;
    responseDisplay.textContent = ""; // Limpa antes de começar a escrever

    function typeLetter() {
        if (i < response.length) {
            responseDisplay.textContent += response[i];
            i++;
            setTimeout(typeLetter, 100); // Velocidade de digitação
        } else {
            callback(); // Finaliza a animação
        }
    }

    typeLetter();
}

// Evento ao clicar no botão de pergunta
askButton.addEventListener("click", function() {
    const question = questionInput.value.trim();
    if (question === "") {
        responseDisplay.textContent = "Por favor, faça uma pergunta.";
        return;
    }

    responseDisplay.textContent = "🔮 Buscando a resposta..."; // Mensagem temporária

    // Iniciar efeito de carregamento antes de dar a resposta
    loadingEffect(() => {
        const randomIndex = Math.floor(Math.random() * responses.length);
        const response = responses[randomIndex];

        // Simula o espírito "escolhendo" a resposta
        typeResponse(response, () => {
            // Após a resposta ser exibida, a planchete volta ao centro
            planchette.style.transform = "translate(-50%, -50%)";
        });
    });

    questionInput.value = "";
});
