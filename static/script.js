// === BOTÃO MENU =====

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const menuClose = document.querySelector(".menu-close");
    const navMenu = document.querySelector(".header-nav");
    const overlay = document.querySelector(".menu-overlay");

    function openMenu() {
        navMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden"; // Trava o scroll
    }

    function closeMenu() {
        navMenu.classList.remove("active");
        overlay.classList.remove("active");
        document.body.style.overflow = ""; // Destrava o scroll
    }

    menuToggle.addEventListener("click", openMenu);

    // Verifica se os elementos existem antes de adicionar o listener
    if (menuClose) menuClose.addEventListener("click", closeMenu);
    if (overlay) overlay.addEventListener("click", closeMenu);

    // Fecha ao clicar em um link
    document.querySelectorAll(".header-nav a").forEach(link => {
        link.addEventListener("click", closeMenu);
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


// ===== swiper ====

document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".services-swiper", {
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

        // ✅ PAGINATION
        pagination: {
            el: ".services-swiper .swiper-pagination",
            clickable: true
        },

        // ✅ SETAS
        navigation: {
            nextEl: ".services-swiper .swiper-button-next",
            prevEl: ".services-swiper .swiper-button-prev"
        }
    });
});

// =========== VER TODOS OS PERFIS ==========

const btn = document.querySelector('.ver-todos-btn');
const grid = document.querySelector('.cards-grid');
const section = document.getElementById('para-quem');

btn.addEventListener('click', () => {
    const expandido = grid.classList.toggle('expandido');

    btn.textContent = expandido
        ? 'Mostrar menos'
        : 'Ver todos os perfis';

    // ao recolher, volta para o topo da section
    if (!expandido) {
        setTimeout(() => {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 300); // espera a animação começar
    }
});


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
    const title = modal.querySelector(".modal-title");
    const description = modal.querySelector(".modal-description");
    const benefitsList = modal.querySelector(".modal-benefits");
    const closeBtn = modal.querySelector(".modal-close");

    document.querySelectorAll(".service-card .button-mais").forEach((button, index) => {
        button.addEventListener("click", function (e) {
            e.preventDefault();

            const service = servicesData[index];

            title.textContent = service.title;
            description.textContent = service.description;

            benefitsList.innerHTML = "";
            service.benefits.forEach(item => {
                const li = document.createElement("li");
                li.textContent = item;
                benefitsList.appendChild(li);
            });

            modal.classList.add("active");
        });
    });

    closeBtn.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    modal.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

});
