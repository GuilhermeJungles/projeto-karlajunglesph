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
    card.draggable = true;

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

let dragged = null;
let mudouOrdem = false;
let lastTarget = null;

preview.addEventListener("dragstart", (e) => {

  const card = e.target.closest(".card");
  if (!card) return;

  dragged = card;

});

preview.addEventListener("dragover", (e) => {

  e.preventDefault();

  const card = e.target.closest(".card");
  if (!card || card === dragged || card === lastTarget) return;

  lastTarget = card;

  const rect = card.getBoundingClientRect();
  const offset = e.clientY - rect.top;

  if (offset > rect.height / 2) {
    card.after(dragged);
  } else {
    card.before(dragged);
  }

  mudouOrdem = true;

  mostrarBotaoSalvar();

});


const btnSalvar = document.getElementById("salvarOrdem");

btnSalvar.addEventListener("click", () => {

  if (!mudouOrdem) return;

  const confirmar = confirm("Deseja salvar a nova ordem das fotos?");
  if (!confirmar) return;

  const cards = preview.querySelectorAll(".card img");

  const novaOrdem = [];

  cards.forEach(img => {
    const src = img.src.split("/").pop();
    novaOrdem.push(src);
  });

  const ativo = document.querySelector(".portfolio-menu button.active");
  if (!ativo) return;

  const portfolioKey = ativo.dataset.portfolio;

  window.savePortfolio(portfolioKey, novaOrdem);

  mudouOrdem = false;

  const btnSair = document.getElementById("sairPainel");

  btnSalvar.style.display = "none";
  btnSair.style.display = "block";

  alert("✅ Ordem salva com sucesso!");

});

function mostrarBotaoSalvar(){

  const btnSalvar = document.getElementById("salvarOrdem");
  const btnSair = document.getElementById("sairPainel");

  btnSalvar.style.display = "block";
  btnSair.style.display = "none";

}