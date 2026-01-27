// Interações básicas: scroll suave, menu ativo e validação simples.
(function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("main section");
  const form = document.getElementById("form-contato");
  const feedback = document.getElementById("mensagem-feedback");
  const anoAtual = document.getElementById("ano-atual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  // Scroll suave ao clicar nos links do menu.
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        event.preventDefault();
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Destaca o link ativo conforme a seção visível.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const link = document.querySelector(`.nav-link[href="#${id}"]`);
        if (link && entry.isIntersecting) {
          navLinks.forEach((nav) => nav.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    { rootMargin: "-30% 0px -60% 0px" }
  );

  sections.forEach((section) => observer.observe(section));

  // Validação simples do formulário.
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const campos = Array.from(form.querySelectorAll("[required]"));
      const camposValidos = campos.every((campo) => campo.value.trim() !== "");

      if (camposValidos) {
        feedback.textContent = "Mensagem pronta para envio";
      } else {
        feedback.textContent = "Preencha todos os campos obrigatórios.";
      }
    });
  }
})();
