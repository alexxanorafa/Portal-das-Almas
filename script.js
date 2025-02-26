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
        "Sim.", "Não.", "Talvez.", "Pergunte novamente.", 
        "Definitivamente!", "Não conte com isso.", "A resposta está incerta.",
        "Com certeza.", "Dúvidas persistem.", "Melhor não dizer agora."
    ];
    
    // Criando um mapa com a posição de cada letra
    const letterMap = {};
    document.querySelectorAll(".letters div, .numbers div, .words div").forEach((section, i) => {
        section.textContent.split(" ").forEach((char, index) => {
            const rect = section.getBoundingClientRect();
            letterMap[char] = {
                x: rect.left + (index * 25), // Ajuste fino
                y: rect.top + 30 + (i * 50) // Ajuste fino
            };
        });
    });
    
    // Efeito de carregamento (movimento aleatório do ponteiro)
    function loadingEffect(callback) {
        let counter = 0;
        const maxMovements = 10; // Quantidade de movimentos antes de começar a resposta
    
        function moveRandomly() {
            if (counter >= maxMovements) {
                callback(); // Inicia a resposta após o efeito de carregamento
                return;
            }
    
            const randomX = Math.random() * 50 - 25; // Movimento aleatório horizontal
            const randomY = Math.random() * 50 - 25; // Movimento aleatório vertical
    
            planchette.style.transform = `translate(${randomX}px, ${randomY}px)`;
            counter++;
            
            setTimeout(moveRandomly, 200); // Pequena pausa antes do próximo movimento
        }
    
        moveRandomly();
    }
    
    // Movimento da planchette para cada letra da resposta
    function movePlanchetteTo(letter, callback) {
        const position = letterMap[letter.toUpperCase()];
        if (position) {
            planchette.style.left = `${position.x}px`;
            planchette.style.top = `${position.y}px`;
            setTimeout(callback, 500); // Pausa antes de mover para a próxima letra
        } else {
            setTimeout(callback, 500); // Se não encontrar, apenas aguarda
        }
    }
    
    // Função para iniciar a animação de resposta
    function startAnswerAnimation(response) {
        responseDisplay.textContent = ""; // Limpa antes de começar a escrever
    
        let i = 0;
        function animateResponse() {
            if (i < response.length) {
                movePlanchetteTo(response[i], function() {
                    responseDisplay.textContent += response[i];
                    i++;
                    animateResponse();
                });
            }
        }
    
        animateResponse();
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
            startAnswerAnimation(response);
        });
    
        questionInput.value = "";
    });    
    