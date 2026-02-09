let menuOpen = false;
let isUserInteracting = false;


document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const navMenu = document.querySelector(".header-nav");
    const overlay = document.querySelector(".menu-overlay");


    function openMenu() {
        navMenu.classList.add("active");
        menuToggle.classList.add("active"); // Adicionado: Transforma em X
        if (overlay) overlay.classList.add("active");
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";
        document.body.dataset.scrollY = scrollY;
        menuOpen = true

    }

    function closeMenu() {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active"); // Adicionado: Volta ao normal
        if (overlay) overlay.classList.remove("active");
        const scrollY = document.body.dataset.scrollY || 0;
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.width = "";
        window.scrollTo(0, scrollY);
        menuOpen = false

    }

    menuToggle.addEventListener("click", () => {
        // Se já estiver aberto, fecha. Se não, abre.
        navMenu.classList.contains("active") ? closeMenu() : openMenu();
    });

    if (menuClose) menuClose.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // Lógica de Dropdown para Mobile (Click em vez de Hover)
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const parent = toggle.closest('.nav-dropdown');
                parent.classList.toggle('dropdown-active');
            }
        });
    });


    document.querySelectorAll(".header-nav a").forEach(link => {
        link.addEventListener("click", (e) => {
            if (link.classList.contains('dropdown-toggle')) return;
            closeMenu();
        });
    });
});

/*=== ANIMAÇÃO DO TIMELINE ===*/

document.addEventListener('DOMContentLoaded', () => {
    const timeline = document.querySelector('.timeline');
    const progress = document.querySelector('.timeline-progress');
    const steps = document.querySelectorAll('.timeline-step');

    window.addEventListener('scroll', () => {
        if (!timeline) return;

        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        /* Linha de progresso */
        const visible = Math.min(
            Math.max(windowHeight - rect.top, 0),
            rect.height
        );

        progress.style.height = (visible / rect.height) * 100 + '%';

        steps.forEach(step => {
            const stepRect = step.getBoundingClientRect();

            /* Ativa quando entra na tela */
            if (stepRect.top < windowHeight * 0.6) {
                step.classList.add('visible', 'active');
            }
        });
    });
});

// ===== DROPDONW DE SERVIÇOS  =====

document.addEventListener("DOMContentLoaded", () => {

    const dropdown = document.querySelector('.nav-dropdown');
    const toggle = dropdown?.querySelector('.dropdown-toggle');

    if (!dropdown || !toggle) return;

    toggle.addEventListener('click', (e) => {

        // Mobile → abre dropdown
        if (window.innerWidth < 1024) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});


// ===== swiper ====

document.addEventListener("DOMContentLoaded", function () {
    servicesSwiper = new Swiper(".services-swiper", {
        loop: true,
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: "auto",
        effect: "creative",

        creativeEffect: {
            perspective: true,
            limitProgress: 3,
            prev: {
                translate: ["-70%", 0, -200],
                scale: 0.85,
                opacity: 0.5
            },
            next: {
                translate: ["70%", 0, -200],
                scale: 0.85,
                opacity: 0.5
            }
        },

        pagination: {
            el: ".services-swiper .swiper-pagination",
            clickable: true
        },

        navigation: {
            nextEl: ".services-swiper .swiper-button-next",
            prevEl: ".services-swiper .swiper-button-prev"
        }
    });
});

// =================== SCROLL SUAVE VER OS SERVIÇOS ===================

document.addEventListener("DOMContentLoaded", () => {

    const footerLinks = document.querySelectorAll('.footer-column a[data-service]');
    const servicesSection = document.querySelector('#servicos');

    if (!footerLinks.length || !servicesSection) return;

    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            const index = Number(link.dataset.service);

            // Scroll suave até a seção
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            // Aguarda o scroll e move o swiper
            setTimeout(() => {
                if (servicesSwiper) {
                    servicesSwiper.slideToLoop(index, 700);
                }
            }, 200);
        });
    });
});

// =================== SCROLL SUAVE SERVIÇO VIA URL ===================
document.addEventListener("DOMContentLoaded", () => {

    if (!window.location.search.includes('service')) return;
    if (!servicesSwiper) return;

    const params = new URLSearchParams(window.location.search);
    const serviceIndex = Number(params.get('service'));

    if (isNaN(serviceIndex)) return;

    const servicesSection = document.querySelector('#servicos');

    // Scroll até a seção
    servicesSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Garante que o swiper vá para o slide correto
    setTimeout(() => {
        servicesSwiper.slideToLoop(serviceIndex, 800);
    }, 200);
});



// =========== VER TODOS OS PERFIS ==========

const btn = document.querySelector('.ver-todos-btn');
const grid = document.querySelector('.cards-grid');
const section = document.getElementById('para-quem');

if (btn && grid && section) {
    btn.addEventListener('click', () => {
        const expandido = grid.classList.toggle('expandido');

        btn.textContent = expandido
            ? 'Mostrar menos'
            : 'Ver todos os perfis';

        if (!expandido) {
            setTimeout(() => {
                section.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }, 300);
        }
    });
}

// ============ MODAL ===========

document.addEventListener("DOMContentLoaded", function () {

    const servicesData = [
        {
            title: "Nutrição Esportiva",
            description: "Planejamento nutricional personalizado para performance, recuperação muscular e saúde metabólica.",
            benefits: [
                "Melhora do rendimento",
                "Recuperação muscular eficiente",
                "Mais energia no dia a dia",
                "Resultados sustentáveis"
            ]
        },
        {
            title: "Emagrecimento",
            description: "Estratégias seguras e personalizadas para redução de gordura com equilíbrio.",
            benefits: [
                "Perda de gordura saudável",
                "Sem dietas restritivas",
                "Mais disposição",
                "Manutenção dos resultados"
            ]
        },
        {
            title: "Avaliação Corporal",
            description: "Análise detalhada da composição corporal para decisões nutricionais assertivas.",
            benefits: [
                "Diagnóstico preciso",
                "Acompanhamento da evolução",
                "Ajustes estratégicos",
                "Resultados mensuráveis"
            ]
        },
        {
            title: "Performance",
            description: "Protocolos nutricionais para atletas e praticantes que buscam alta performance.",
            benefits: [
                "Melhora da performance esportiva",
                "Recuperação otimizada",
                "Prevenção de lesões",
                "Mais consistência nos treinos"
            ]
        }
    ];

    const modal = document.getElementById("service-modal");

    if (!modal) return; // ⬅️ ESSENCIAL

    const title = modal.querySelector(".modal-title");
    const description = modal.querySelector(".modal-description");
    const benefitsList = modal.querySelector(".modal-benefits");
    const closeBtn = modal.querySelector(".modal-close");

    document.querySelectorAll(".service-card .button-mais").forEach(button => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const index = this.dataset.service;
            const service = servicesData[index];

            if (!service) return;

            title.textContent = service.title;
            description.textContent = service.description;

            benefitsList.innerHTML = "";
            service.benefits.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                benefitsList.appendChild(li);
            });

            modal.classList.add("active");
            document.body.style.overflow = "hidden";
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
});


// ====== ACCORDION ======

const accordionItems = document.querySelectorAll('.accordion-item');
const imageContainer = document.querySelector('.diferencial-image img');

if (accordionItems.length && imageContainer) {

    const images = [
        'static/imgs/diferencial-1.jpg',
        'static/imgs/diferencial-2.jpg',
        'static/imgs/diferencial-3.jpg',
        'static/imgs/diferencial-4.jpg',
        'static/imgs/diferencial-5.jpg',
        'static/imgs/diferencial-6.jpg'
    ];

    accordionItems.forEach((item, index) => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('active');

            accordionItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-content').style.maxHeight = null;
            });

            if (!isOpen) {
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';

                imageContainer.style.opacity = '0';
                imageContainer.style.transform = 'scale(1.05)';

                setTimeout(() => {
                    imageContainer.src = images[index];
                    imageContainer.onload = () => {
                        imageContainer.style.opacity = '1';
                        imageContainer.style.transform = 'scale(1)';
                    };
                }, 250);
            }
        });
    });

}


// ====== SLIDE SUAVE DE SOBRE MIM ======

document.addEventListener("DOMContentLoaded", function () {
    const quemSouEuSlider = new Swiper('.quemSouEu-slider', {
        loop: true,
        grabCursor: true,
        slidesPerView: 1,
        spaceBetween: 0,

        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },

        speed: 1000,
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        }
    });
});

// ================= HEADER FIXO COM SCROLL =================

document.addEventListener("DOMContentLoaded", () => {

    const header = document.querySelector(".header");
    if (!header) return;

    let lastScrollY = window.scrollY;
    let scrollTimeout;
    let isInteracting = false;


    const showHeader = () => {
        header.classList.add("is-visible");
        header.classList.remove("is-hidden");
    };

    const hideHeader = () => {
        header.classList.remove("is-visible");
        header.classList.add("is-hidden");
    };

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        // 🔒 Se menu estiver aberto ou usuário interagindo, congela o header
        if (menuOpen || isUserInteracting) {
            lastScrollY = currentScroll;
            return;
        }


        // Sempre visível no topo
        if (currentScroll <= 10) {
            header.classList.add("is-fixed");
            showHeader();
            lastScrollY = currentScroll;
            return;
        }

        header.classList.add("is-fixed");

        // Scroll para baixo → esconde
        if (currentScroll > lastScrollY && !isInteracting) {
            hideHeader();
        }

        // Scroll para cima → mostra
        if (currentScroll < lastScrollY - 10 && !isInteracting) {
            showHeader();
        }

        lastScrollY = currentScroll;

        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isInteracting && window.scrollY > 10) {
                hideHeader();
            }
        }, 1500);
    });

    // Interação (desktop + mobile)
    header.addEventListener("mouseenter", () => isUserInteracting = true);
    header.addEventListener("mouseleave", () => isUserInteracting = false);
    header.addEventListener("touchstart", () => isUserInteracting = true);
    header.addEventListener("touchend", () => isUserInteracting = false);
    ;

    // Estado inicial
    header.classList.add("is-fixed", "is-visible");
    header.classList.remove("is-hidden");
});

// ====== CHATBOT ======

//CHAT BOt
const chatToggle = document.getElementById("chatToggle");
const chatbot = document.getElementById("chatbot");
const closeChat = document.getElementById("closeChat");
const chatBody = document.getElementById("chatBody");
const chatOptions = document.getElementById("chatOptions");

chatToggle.onclick = () => chatbot.classList.toggle("hidden");
closeChat.onclick = () => chatbot.classList.add("hidden");

function botMessage(text) {
    chatBody.innerHTML += `<div class="bot">${text}</div>`;
    chatBody.scrollTop = chatBody.scrollHeight;
}

function showOptions(options) {
    chatOptions.innerHTML = "";
    options.forEach(opt => {
        const btn = document.createElement("button");
        btn.innerText = opt.label;
        btn.onclick = opt.action;
        chatOptions.appendChild(btn);
    });
}

// ===== FLUXOS =====
document.addEventListener("DOMContentLoaded", () => {


    /* ===============================
       ELEMENTOS
    =============================== */
    const chatToggle = document.getElementById("chatToggle");
    const chatbot = document.getElementById("chatbot");
    const closeChat = document.getElementById("closeChat");
    const chatBody = document.getElementById("chatBody");
    const chatOptions = document.getElementById("chatOptions");
    const chatOverlay = document.getElementById("chatOverlay");
    const clearChatBtn = document.getElementById("clearChat");

    let userData = {};
    let typingEl = null;
    let scrollTop = 0;

    function openChat() {
        scrollTop = window.scrollY;

        chatbot.classList.remove("hidden");
        chatOverlay.classList.remove("hidden");
        document.body.style.top = `-${scrollTop}px`;
        document.body.classList.add("chat-open");

        if (!chatbot.dataset.started) {
            startChat();
            chatbot.dataset.started = "true";
        }
    }

    function closeChatFn() {
        chatbot.classList.add("hidden");
        chatOverlay.classList.add("hidden");
        document.body.classList.remove("chat-open");
        document.body.style.top = "";
        window.scrollTo(0, scrollTop);
    }

    chatToggle.addEventListener("click", openChat);
    closeChat.addEventListener("click", closeChatFn);
    chatOverlay.addEventListener("click", closeChatFn);

    /* ===============================
       LIMPAR CONVERSA (DESKTOP + MOBILE)
    =============================== */
    function resetChat(e) {
        e.preventDefault();

        chatBody.innerHTML = "";
        chatOptions.innerHTML = "";
        userData = {};
        chatbot.dataset.started = "";

        botReply("Tudo bem 😊 Vamos começar novamente.", 1000);
        setTimeout(startChat, 1200);
    }

    if (clearChatBtn) {
        clearChatBtn.addEventListener("click", resetChat);
        clearChatBtn.addEventListener("touchstart", resetChat, { passive: false });
    }

    /* ===============================
       BASE DE CONHECIMENTO
    =============================== */
    const knowledge = {
        intro: `
Que bom ter você aqui! Sou a assistente virtual da Nutri Gisele Karine.
Estou aqui para te orientar sobre os serviços nutricionais
e esclarecer suas dúvidas iniciais.
    `,
        horarios: `
Os atendimentos acontecem de quarta a sexta-feira,
com horários flexíveis para se adequar à sua rotina.
(atendimento é realizado mediante agendamento prévio).
    `,
        localizacao: `
Av. Teotônio Vilela, 3261 - Lot. Vila Rica, Rio Largo - 
Maceió – AL | CEP: 57.100-000
    `,
        procedimentos: {
            nutricao_esportiva: {
                nome: "Nutrição Esportiva",
                descricao: "Planejamento alimentar individualizado voltado para melhora da performance, recuperação muscular e prevenção de lesões.",
                indicado: "Pessoas fisicamente ativas, atletas ou praticantes de exercícios que desejam melhorar rendimento e resultados.",
                como_funciona: "É realizada uma avaliação completa da rotina de treinos, objetivos, hábitos alimentares e composição corporal para elaboração de um plano alimentar personalizado."
            },

            emagrecimento: {
                nome: "Emagrecimento",
                descricao: "Estratégias nutricionais seguras e sustentáveis para redução de gordura corporal e melhora da saúde metabólica.",
                indicado: "Pessoas que desejam emagrecer de forma saudável, sem dietas restritivas e com acompanhamento profissional.",
                como_funciona: "O plano alimentar é ajustado à rotina do paciente, promovendo déficit calórico controlado e educação alimentar."
            },

            avaliacao_corporal: {
                nome: "Avaliação Corporal",
                descricao: "Análise detalhada da composição corporal e acompanhamento da evolução física.",
                indicado: "Pessoas que desejam acompanhar resultados, evolução estética e desempenho físico.",
                como_funciona: "São realizadas medições corporais e análise de dados para acompanhamento e ajustes no plano nutricional."
            },

            performance: {
                nome: "Performance",
                descricao: "Protocolos nutricionais específicos para melhora do rendimento físico e esportivo.",
                indicado: "Atletas e praticantes de atividade física que buscam aumento de força, resistência e desempenho.",
                como_funciona: "A nutrição é ajustada conforme volume de treino, competição, descanso e necessidades energéticas."
            },

            reeducacao_alimentar: {
                nome: "Reeducação Alimentar",
                descricao: "Construção de hábitos alimentares saudáveis e sustentáveis.",
                indicado: "Pessoas que desejam melhorar a relação com a comida e manter resultados a longo prazo.",
                como_funciona: "O acompanhamento é feito de forma gradual, respeitando a rotina e preferências alimentares."
            },

            nutricao_clinica: {
                nome: "Nutrição Clínica",
                descricao: "Acompanhamento nutricional para promoção da saúde e controle de condições metabólicas.",
                indicado: "Pessoas com alterações metabólicas, digestivas ou que buscam mais qualidade de vida.",
                como_funciona: "O atendimento é baseado em avaliação clínica, exames e planejamento alimentar individualizado."
            }
        }
    };

    /* ===============================
       DIGITAÇÃO REAL
    =============================== */
    function showTyping() {
        hideTyping();
        typingEl = document.createElement("div");
        typingEl.className = "bot typing";
        typingEl.textContent = "Digitando...";
        chatBody.appendChild(typingEl);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function hideTyping() {
        if (typingEl) {
            typingEl.remove();
            typingEl = null;
        }
    }

    function botReply(text, delay = 900) {
        showTyping();
        setTimeout(() => {
            hideTyping();
            chatBody.innerHTML += `<div class="bot">${text.replace(/\n/g, "<br>")}</div>`;
            chatBody.scrollTop = chatBody.scrollHeight;
        }, delay + Math.random() * 500);
    }

    function userReply(text) {
        chatBody.innerHTML += `<div class="user">${text}</div>`;
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function showOptions(options) {
        chatOptions.innerHTML = "";
        options.forEach(opt => {
            const btn = document.createElement("button");
            btn.textContent = opt.label;
            btn.onclick = () => {
                userReply(opt.label);
                chatOptions.innerHTML = "";
                opt.action();
            };
            chatOptions.appendChild(btn);
        });
    }

    /* ===============================
       FLUXO
    =============================== */
    function startChat() {
        chatBody.innerHTML = "";
        chatOptions.innerHTML = "";
        botReply(knowledge.intro);
        setTimeout(askName, 1200);
    }

    function askName() {
        botReply("Antes de começarmos, como posso te chamar?");
        chatOptions.innerHTML = `
            <div class="chat-input-area">
                <input type="text" id="inputUser" placeholder="Digite seu nome" />
                <button id="sendBtn">Enviar</button>
            </div>
        `;

        const input = document.getElementById("inputUser");
        const btn = document.getElementById("sendBtn");

        btn.onclick = () => {
            if (!input.value.trim()) return;
            userReply(input.value);
            userData.nome = input.value.trim();
            chatOptions.innerHTML = "";
            botReply(`Prazer, ${userData.nome}! Como posso te ajudar hoje?`);
            setTimeout(mainMenu, 1200);
        };

        input.addEventListener("keydown", e => {
            if (e.key === "Enter") btn.click();
        });
    }

    function mainMenu() {
        botReply("O que você gostaria de fazer agora?");

        setTimeout(() => {
            showOptions([
                { label: "Conhecer os serviços", action: menuProcedimentos },
                { label: "Não sei por onde começar", action: ajudaInicial },
                { label: "Horários de atendimento", action: () => replyAndReturn(knowledge.horarios) },
                { label: "Localização da clínica", action: () => replyAndReturn(knowledge.localizacao) },
                { label: "Falar com a Gisele Karine", action: whatsapp }
            ]);
        }, 800);
    }

    function ajudaInicial() {
        botReply("Sem problemas 😊 Me conta: qual é seu principal objetivo hoje?");

        showOptions([
            { label: "Emagrecer", action: () => mostrarProcedimento("emagrecimento") },
            { label: "Ganhar massa muscular", action: () => mostrarProcedimento("nutricao_esportiva") },
            { label: "Melhorar desempenho físico", action: () => mostrarProcedimento("performance") },
            { label: "Cuidar da saúde", action: () => mostrarProcedimento("nutricao_clinica") }
        ]);
    }


    function replyAndReturn(text) {
        botReply(text);
        setTimeout(mainMenu, 1800);
    }

    function menuProcedimentos() {
        botReply(`${userData.nome}, qual procedimento você gostaria de conhecer?`);
        showOptions(
            Object.keys(knowledge.procedimentos).map(key => ({
                label: knowledge.procedimentos[key].nome,
                action: () => mostrarProcedimento(key)
            })).concat([{ label: "Voltar", action: mainMenu }])
        );
    }

    function mostrarProcedimento(key) {
        const p = knowledge.procedimentos[key];

        botReply(`🔹 ${p.nome}\n\n${p.descricao}`);
        setTimeout(() => botReply(`👤 Indicado para:\n${p.indicado}`), 1200);
        setTimeout(() => botReply(`📝 Como funciona:\n${p.como_funciona}`), 2200);

        setTimeout(() => {
            showOptions([
                { label: "Falar com a nutri", action: whatsapp },
                { label: "Ver outro serviço", action: menuProcedimentos }
            ]);
        }, 3400);
    }


    function whatsapp() {
        botReply(`${userData.nome}, vou te direcionar para o WhatsApp da nutri.`);
        showOptions([
            {
                label: "Ir para o WhatsApp",
                action: () => window.open(
                    "https://wa.me/558282139203?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.",
                    "_blank"
                )
            },
            { label: "Voltar", action: mainMenu }
        ]);
    }

});

document.addEventListener("DOMContentLoaded", () => {

    // TOOLTIP DO CHATBOT

    const tooltip = document.getElementById("chatbotTooltip");
    const chatToggle = document.getElementById("chatToggle");

    if (!tooltip) return;

    // ⏱️ tempos configuráveis
    const SHOW_DELAY = 4500; // 4.5 segundos
    const HIDE_DELAY = 5000; // tempo visível após aparecer

    // Mostra o tooltip após alguns segundos
    setTimeout(() => {
        tooltip.classList.add("show");
    }, SHOW_DELAY);

    // Esconde suavemente depois
    const autoHide = setTimeout(() => {
        tooltip.classList.remove("show");
    }, SHOW_DELAY + HIDE_DELAY);

    // Clique no chat esconde imediatamente
    if (chatToggle) {
        chatToggle.addEventListener("click", () => {
            clearTimeout(autoHide);
            tooltip.classList.remove("show");
        });
    }
});