const preview = document.getElementById("portfolioPreview");
const buttons = document.querySelectorAll(".portfolio-menu button");

const basePaths = {
  casamento: "../img/casamento-pre-wedding/",
  corporativo: "../img/CORPORATIVO-POSICIONAMENTO/"
};

function renderPortfolio(name) {

  preview.innerHTML = "";

  const fotos = window.getPortfolio(name);

  if (!fotos || fotos.length === 0) {
    preview.innerHTML = "<p>Sem imagens neste portfólio.</p>";
    return;
  }

  fotos.forEach(filename => {

    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = basePaths[name] + filename;
    img.alt = "Imagem do portfólio";

    card.appendChild(img);
    preview.appendChild(card);

  });

}

buttons.forEach(btn => {

  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const portfolio = btn.dataset.portfolio;

    renderPortfolio(portfolio);

  });

});


function salvarOrdem(portfolioKey, fotos) {
  // garante formato
  const seguro = fotos.map((f, i) => ({
    id: f.id || String(i),
    src: f.src || f
  }));

  localStorage.setItem(
    `portfolio-${portfolioKey}`,
    JSON.stringify(seguro)
  );
}
