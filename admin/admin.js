// admin.js
console.log("admin.js carregado");

const form = document.getElementById("loginForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    // CREDENCIAIS TEMPORÁRIAS (FRONT-END)
    const ADMIN_EMAIL = "karlajunglesfotografia@hotmail.com";
    const ADMIN_SENHA = "Kklj$348511";

    if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
      sessionStorage.setItem("adminAuth", "true");
      window.location.href = "admin.html";
    } else {
      alert("⚠️ Acesso restrito: e-mail ou senha incorretos");
    }
  });
}