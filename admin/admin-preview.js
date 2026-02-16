// admin-preview.js

const preview = document.getElementById("portfolioPreview");
const buttons = document.querySelectorAll(".portfolio-menu button");

/*
  Estrutura TEMPORÁRIA de portfólios
  Depois vamos trocar por Firebase / Cloudinary
*/
const basePaths = {
  casamento: "../img/casamento-pre-wedding/",
  corporativo: "../img/CORPORATIVO-POSICIONAMENTO/",
};

const portfolios = {
  casamento: window.fotosCasamento || [],
  corporativo: window.fotosCorporativo || []
};

function renderPortfolio(name) {
  preview.innerHTML = "";

  const fotos = portfolios[name];

  if (!fotos || fotos.length === 0) {
    preview.innerHTML = "<p>Sem imagens neste portfólio.</p>";
    return;
  }

  fotos.forEach(filename => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = basePaths[name] + filename;  // Monta caminho completo
    img.alt = "Imagem do portfólio";

    card.appendChild(img);
    preview.appendChild(card);
  });
}

// Clique nos botões do menu
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const portfolio = btn.dataset.portfolio;
    renderPortfolio(portfolio);
  });
});

function salvarOrdem(portfolioKey, fotos) {
  localStorage.setItem(
    `portfolio-${portfolioKey}`,
    JSON.stringify(fotos)
  );
}
