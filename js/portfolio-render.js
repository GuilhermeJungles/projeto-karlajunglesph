document.querySelectorAll(".grid").forEach(grid => {
  const pasta = grid.dataset.pasta;
  const key = grid.dataset.portfolio; // 👈 AQUI

  const fotos = window.PORTFOLIOS[key];
  if (!fotos) return;

  fotos.forEach(img => {
    const image = document.createElement("img");
    image.src = `${pasta}/${img}`;
    grid.appendChild(image);
  });
});