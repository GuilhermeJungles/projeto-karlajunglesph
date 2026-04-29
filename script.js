document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       CAROUSEL (SLIDER AUTOMATICO)
    ========================= */
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    const carouselContainer = document.querySelector('.carousel-container');
    
    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 5000; // 5 segundos

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        if (slides[index]) {
            slides[index].classList.add('active');
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, autoplayDelay);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners dos botoes
    if (prevBtn) prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevSlide();
        startAutoplay();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextSlide();
        startAutoplay();
    });

    // Pausar autoplay ao passar o mouse
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
    }

    // Iniciar com o primeiro slide visivel e autoplay
    if (slides.length > 0) {
        showSlide(0);
        startAutoplay();
    }

    /* =========================
       SCROLL EFFECT (HEADER & NAVBAR)
    ========================= */
    const header = document.querySelector('.header');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            if (header) header.classList.add('scroll');
            if (navbar) navbar.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scroll');
            if (navbar) navbar.classList.remove('scrolled');
        }
    });

    /* =========================
       DROPDOWN MENU CONTROL
    ========================= */
    const dropdowns = document.querySelectorAll('.dropdown');
    let dropdownTimeout;

    dropdowns.forEach(dropdown => {
        const menu = dropdown.querySelector('.dropdown-menu');
        const btn = dropdown.querySelector('.dropdown-btn');

        if (!menu || !btn) return;

        // Manter menu aberto ao passar o mouse
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            menu.style.display = 'flex';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
        });

        dropdown.addEventListener('mouseleave', () => {
            dropdownTimeout = setTimeout(() => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            }, 150);
        });

        // Manter menu aberto ao passar o mouse sobre o menu
        menu.addEventListener('mouseenter', () => {
            clearTimeout(dropdownTimeout);
            menu.style.display = 'flex';
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
        });

        menu.addEventListener('mouseleave', () => {
            dropdownTimeout = setTimeout(() => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            }, 150);
        });

        // Fechar ao clicar em um link
        const links = menu.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                menu.style.display = 'none';
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
            });
        });
    });

    /* =========================
       LAZY LOAD
    ========================= */
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.add("loaded");
            obs.unobserve(img);
        });
    }, { rootMargin: "200px" });

    let imagens = [];
    let indexAtual = 0;

    /* =========================
       GALERIA
    ========================= */
    document.querySelectorAll(".grid").forEach(galeria => {
        const pasta = galeria.dataset.pasta;
        const arrayName = galeria.dataset.array;

        if (!pasta || !arrayName || !window[arrayName]) return;

        const fotos = window[arrayName];

        fotos.forEach((nome, index) => {
            const img = document.createElement("img");
            img.dataset.src = `${pasta}/${nome}`;
            img.alt = "";
            img.loading = "lazy";

            /* 🎨 VARIAÇÃO VISUAL */
            if (index >= 9 && index <= fotos.length - 6) {
                if (index === 10 || index === 17 || index === 25) {
                    img.classList.add("img-quadrada");
                }
                if (index === 14 || index === 22) {
                    img.classList.add("img-horizontal");
                }
                if (index === 19 || index === 28) {
                    img.classList.add("img-vertical");
                }
            }

            /* 🔥 CLIQUE DIRETO NA IMAGEM */
            img.addEventListener("click", () => abrirLightbox(index));

            observer.observe(img);
            galeria.appendChild(img);
            imagens.push(img);
        });
    });

    /* =========================
       LIGHTBOX
    ========================= */
    const lightbox = document.getElementById("lightbox");
    if (lightbox) {
        const lightboxImg = lightbox.querySelector("img");
        const prevBtn = lightbox.querySelector(".prev");
        const nextBtn = lightbox.querySelector(".next");

        function abrirLightbox(index) {
            indexAtual = index;
            const img = imagens[indexAtual];

            if (!img.src || img.src === "") {
                img.src = img.dataset.src;
            }

            lightboxImg.src = img.src;
            lightbox.classList.add("active");
        }

        function fecharLightbox() {
            lightbox.classList.remove("active");
        }

        function proxima() {
            indexAtual = (indexAtual + 1) % imagens.length;
            const img = imagens[indexAtual];
            if (!img.src || img.src === "") img.src = img.dataset.src;
            lightboxImg.src = img.src;
        }

        function anterior() {
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
            const img = imagens[indexAtual];
            if (!img.src || img.src === "") img.src = img.dataset.src;
            lightboxImg.src = img.src;
        }

        if (nextBtn) nextBtn.addEventListener("click", e => { e.stopPropagation(); proxima(); });
        if (prevBtn) prevBtn.addEventListener("click", e => { e.stopPropagation(); anterior(); });

        lightbox.addEventListener("click", fecharLightbox);

        document.addEventListener("keydown", e => {
            if (!lightbox.classList.contains("active")) return;
            if (e.key === "Escape") fecharLightbox();
            if (e.key === "ArrowRight") proxima();
            if (e.key === "ArrowLeft") anterior();
        });
    }
});