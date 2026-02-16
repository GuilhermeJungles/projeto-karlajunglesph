function getPortfolio(key) {
  try {
    const salvo = localStorage.getItem(`portfolio-${key}`);
    const parsed = JSON.parse(salvo);

    if (Array.isArray(parsed) && parsed.length) {
      return parsed;
    }
  } catch (e) {}

  return window.PORTFOLIOS[key] || [];
}

function salvarPortfolio(key, fotos) {
  localStorage.setItem(
    `portfolio-${key}`,
    JSON.stringify(fotos)
  );
}