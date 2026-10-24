document.addEventListener("DOMContentLoaded", () => {
  const cardsContainer = document.getElementById("blog-cards");
  const titleEl = document.getElementById("blog-title");
  const chapeuEl = document.getElementById("blog-chapeu");
  const descEl = document.getElementById("blog-description");
  const emptyState = document.getElementById("blog-empty-state");

  // Se não estiver na página com listagem de cards, não executa o filtro na página atual
  if (!cardsContainer) return;

  const defaultTitle = titleEl ? titleEl.textContent : "Blog";
  const defaultChapeu = chapeuEl ? chapeuEl.textContent : "Blog";
  const defaultDesc = descEl ? descEl.innerHTML : "Dia a dia, hobbies, reflexões e nada com nada.";
  const defaultDocTitle = document.title;

  function normalizar(texto) {
    return (texto || "")
      .toString()
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function aplicarFiltro(categoria, atualizaHistorico = false) {
    const cards = document.querySelectorAll(".blog-card");
    const categoryLinks = document.querySelectorAll(".cat-link");

    if (categoria && categoria.trim() !== "") {
      const catTrim = categoria.trim();
      const normAlvo = normalizar(catTrim);
      let visiveis = 0;

      cards.forEach((card) => {
        const rawCats = card.getAttribute("data-categories") || "";
        const cardCategorias = rawCats.split("|").map(normalizar);
        if (cardCategorias.includes(normAlvo)) {
          card.style.display = "";
          visiveis++;
        } else {
          card.style.display = "none";
        }
      });

      if (emptyState) {
        emptyState.style.display = visiveis === 0 ? "block" : "none";
      }

      // Atualiza o título e cabeçalho com o nome da categoria
      if (titleEl) {
        titleEl.textContent = catTrim;
      }
      const extraTitles = document.querySelectorAll("#trabalhos > article h2");
      extraTitles.forEach((el) => (el.textContent = catTrim));

      if (chapeuEl) {
        chapeuEl.textContent = "Categoria";
      }
      if (descEl) {
        descEl.innerHTML = `Mostrando ${visiveis} ${visiveis === 1 ? "post" : "posts"} em <strong>${catTrim}</strong>. <a href="/blog/" class="limpar-filtro">Ver todos os posts</a>`;
      }
      document.title = `${catTrim} | Blog`;

      // Destaca a categoria ativa no widget lateral
      categoryLinks.forEach((link) => {
        const catNome = link.getAttribute("data-category") || link.textContent;
        if (normalizar(catNome) === normAlvo) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });

      if (atualizaHistorico) {
        const url = new URL(window.location);
        url.searchParams.set("categoria", catTrim);
        window.history.pushState({ categoria: catTrim }, "", url);
      }
    } else {
      // Limpar filtro / exibir todos os posts
      cards.forEach((card) => (card.style.display = ""));
      if (emptyState) emptyState.style.display = "none";

      if (titleEl) titleEl.textContent = defaultTitle;
      const extraTitles = document.querySelectorAll("#trabalhos > article h2");
      extraTitles.forEach((el) => (el.textContent = defaultTitle));

      if (chapeuEl) chapeuEl.textContent = defaultChapeu;
      if (descEl) descEl.innerHTML = defaultDesc;
      document.title = defaultDocTitle;

      categoryLinks.forEach((link) => link.classList.remove("active"));

      if (atualizaHistorico) {
        const url = new URL(window.location);
        url.searchParams.delete("categoria");
        window.history.pushState({}, "", url.pathname);
      }
    }
  }

  // Interceptar cliques em links de categoria quando já estiver na página /blog
  document.addEventListener("click", (e) => {
    const linkLimpar = e.target.closest(".limpar-filtro");
    if (linkLimpar) {
      e.preventDefault();
      aplicarFiltro(null, true);
      return;
    }

    const catLink = e.target.closest('a[href*="categoria="]');
    if (catLink && window.location.pathname.includes("/blog")) {
      e.preventDefault();
      const href = catLink.getAttribute("href");
      const url = new URL(href, window.location.origin);
      const categoria = url.searchParams.get("categoria");
      aplicarFiltro(categoria, true);
      cardsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  // Tratar navegação do histórico (botões Voltar/Avançar do navegador)
  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    aplicarFiltro(cat, false);
  });

  // Filtro inicial baseado na URL atual
  const params = new URLSearchParams(window.location.search);
  const catInicial = params.get("categoria");
  if (catInicial) {
    aplicarFiltro(catInicial, false);
  }
});

