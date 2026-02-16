document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  if (!grid) return;

  const key = grid.dataset.portfolio;
  const pasta = grid.dataset.pasta;

const fotos = getPortfolio(key);

  if (!Array.isArray(fotos)) {
    console.error("Portfólio inválido:", key);
    return;
  }

  fotos.forEach(nome => {
    const img = document.createElement("img");
    img.src = `${pasta}/${nome}`;
    grid.appendChild(img);
  });
});