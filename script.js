document.addEventListener("DOMContentLoaded", () => {

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
    const lightboxImg = lightbox.querySelector("img");
    const prevBtn = lightbox.querySelector(".prev");
    const nextBtn = lightbox.querySelector(".next");

    function abrirLightbox(index) {
        indexAtual = index;

        const img = imagens[indexAtual];

        // ✅ CORREÇÃO PRINCIPAL
        // força carregar a imagem se ainda estiver lazy
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

        if (!img.src || img.src === "") {
            img.src = img.dataset.src;
        }

        lightboxImg.src = img.src;
    }

    function anterior() {
        indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        const img = imagens[indexAtual];

        if (!img.src || img.src === "") {
            img.src = img.dataset.src;
        }

        lightboxImg.src = img.src;
    }

    /* =========================
       CONTROLES
    ========================= */
    nextBtn.addEventListener("click", e => {
        e.stopPropagation();
        proxima();
    });

    prevBtn.addEventListener("click", e => {
        e.stopPropagation();
        anterior();
    });

    lightbox.addEventListener("click", fecharLightbox);

    document.addEventListener("keydown", e => {
        if (!lightbox.classList.contains("active")) return;

        if (e.key === "Escape") fecharLightbox();
        if (e.key === "ArrowRight") proxima();
        if (e.key === "ArrowLeft") anterior();
    });

});