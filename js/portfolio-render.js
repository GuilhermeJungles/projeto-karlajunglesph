const grid = document.querySelector('.grid');
if (!grid) return;

const pasta = grid.dataset.pasta;
const key = grid.dataset.portfolio;

const fotos = window.PORTFOLIOS[key];

fotos.forEach(nome => {
  const img = document.createElement('img');
  img.src = `${pasta}/${nome}`;
  grid.appendChild(img);
});