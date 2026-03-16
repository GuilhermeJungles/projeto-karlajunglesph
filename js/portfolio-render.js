document.querySelectorAll(".grid").forEach(grid => {
  const pasta = grid.dataset.pasta;
  const key = grid.dataset.portfolio;

  const fotos = window.getPortfolio(key);

  if (!fotos || !fotos.length) return;

  grid.innerHTML = "";

  fotos.forEach(nome => {
    const img = document.createElement("img");
    img.src = `${pasta}/${nome}`;
    img.loading = "lazy";
    grid.appendChild(img);
  });
});