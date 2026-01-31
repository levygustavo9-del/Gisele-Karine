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
        link.addEventListener("click", (e) => {

            // NÃO fecha se for toggle de dropdown
            if (link.classList.contains('dropdown-toggle')) {
                return;
            }

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
    header.addEventListener("mouseenter", () => isInteracting = true);
    header.addEventListener("mouseleave", () => isInteracting = false);
    header.addEventListener("touchstart", () => isInteracting = true);
    header.addEventListener("touchend", () => isInteracting = false);

    // Estado inicial
    header.classList.add("is-fixed", "is-visible");
    header.classList.remove("is-hidden");
});
