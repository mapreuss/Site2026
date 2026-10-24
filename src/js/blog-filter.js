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

  function aplicarFiltro(tipo, valor, atualizaHistorico = false) {
    const cards = document.querySelectorAll(".blog-card");
    const categoryLinks = document.querySelectorAll(".cat-link");
    const tagLinks = document.querySelectorAll(".tag-link");

    const isValido = (tipo === "categoria" || tipo === "tag") && valor && valor.trim() !== "";

    if (isValido) {
      const valorTrim = valor.trim();
      const normAlvo = normalizar(valorTrim);
      const isCategoria = tipo === "categoria";
      const isTag = tipo === "tag";
      let visiveis = 0;

      cards.forEach((card) => {
        let match = false;
        if (isCategoria) {
          const rawCats = card.getAttribute("data-categories") || "";
          const cardCategorias = rawCats.split("|").map(normalizar);
          match = cardCategorias.includes(normAlvo);
        } else if (isTag) {
          const rawTags = card.getAttribute("data-tags") || "";
          const cardTags = rawTags.split("|").map(normalizar);
          match = cardTags.includes(normAlvo);
        }

        if (match) {
          card.style.display = "";
          visiveis++;
        } else {
          card.style.display = "none";
        }
      });

      if (emptyState) {
        const emptyMsg = emptyState.querySelector("p");
        if (emptyMsg) {
          emptyMsg.textContent = isTag
            ? `Nenhum post encontrado com a tag "${valorTrim}".`
            : `Nenhum post encontrado nesta categoria.`;
        }
        emptyState.style.display = visiveis === 0 ? "block" : "none";
      }

      // Atualiza o título e cabeçalho com o nome da categoria ou tag
      if (titleEl) {
        titleEl.textContent = valorTrim;
      }
      const extraTitles = document.querySelectorAll("#trabalhos > article h2");
      extraTitles.forEach((el) => (el.textContent = valorTrim));

      if (chapeuEl) {
        chapeuEl.textContent = isTag ? "Tag" : "Categoria";
      }
      if (descEl) {
        const rotulo = isTag ? `com a tag ${valorTrim}` : `em ${valorTrim}`;
        descEl.innerHTML = `Mostrando ${visiveis} ${visiveis === 1 ? "post" : "posts"} ${rotulo}. <a href="/blog/" class="limpar-filtro">Ver todos os posts</a>`;
      }
      document.title = `${valorTrim} | Blog`;

      // Destaca os links ativos
      categoryLinks.forEach((link) => {
        if (isCategoria) {
          const catNome = link.getAttribute("data-category") || link.textContent;
          const match = normalizar(catNome) === normAlvo;
          link.classList.toggle("active", match);
          link.closest("li")?.classList.toggle("active", match);
        } else {
          link.classList.remove("active");
          link.closest("li")?.classList.remove("active");
        }
      });

      tagLinks.forEach((link) => {
        if (isTag) {
          const tagNome = link.getAttribute("data-tag") || link.textContent;
          const match = normalizar(tagNome) === normAlvo;
          link.classList.toggle("active", match);
          link.closest("li")?.classList.toggle("active", match);
        } else {
          link.classList.remove("active");
          link.closest("li")?.classList.remove("active");
        }
      });

      if (atualizaHistorico) {
        const url = new URL(window.location);
        if (isCategoria) {
          url.searchParams.set("categoria", valorTrim);
          url.searchParams.delete("tag");
        } else {
          url.searchParams.set("tag", valorTrim);
          url.searchParams.delete("categoria");
        }
        window.history.pushState({ tipo, valor: valorTrim }, "", url);
      }
    } else {
      // Limpar filtro / exibir todos os posts
      cards.forEach((card) => (card.style.display = ""));
      if (emptyState) {
        const emptyMsg = emptyState.querySelector("p");
        if (emptyMsg) {
          emptyMsg.textContent = "Nenhum post encontrado nesta categoria.";
        }
        emptyState.style.display = "none";
      }

      if (titleEl) titleEl.textContent = defaultTitle;
      const extraTitles = document.querySelectorAll("#trabalhos > article h2");
      extraTitles.forEach((el) => (el.textContent = defaultTitle));

      if (chapeuEl) chapeuEl.textContent = defaultChapeu;
      if (descEl) descEl.innerHTML = defaultDesc;
      document.title = defaultDocTitle;

      categoryLinks.forEach((link) => {
        link.classList.remove("active");
        link.closest("li")?.classList.remove("active");
      });
      tagLinks.forEach((link) => {
        link.classList.remove("active");
        link.closest("li")?.classList.remove("active");
      });

      if (atualizaHistorico) {
        const url = new URL(window.location);
        url.searchParams.delete("categoria");
        url.searchParams.delete("tag");
        window.history.pushState({}, "", url.pathname);
      }
    }
  }

  // Interceptar cliques em links de categoria e tag quando já estiver na página /blog
  document.addEventListener("click", (e) => {
    const linkLimpar = e.target.closest(".limpar-filtro");
    if (linkLimpar) {
      e.preventDefault();
      aplicarFiltro(null, null, true);
      return;
    }

    const catLink = e.target.closest('a[href*="categoria="]');
    if (catLink && window.location.pathname.includes("/blog")) {
      e.preventDefault();
      const href = catLink.getAttribute("href");
      const url = new URL(href, window.location.origin);
      const categoria = url.searchParams.get("categoria");
      aplicarFiltro("categoria", categoria, true);
      cardsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const tagLink = e.target.closest('a[href*="tag="]');
    if (tagLink && window.location.pathname.includes("/blog")) {
      e.preventDefault();
      const href = tagLink.getAttribute("href");
      const url = new URL(href, window.location.origin);
      const tag = url.searchParams.get("tag");
      aplicarFiltro("tag", tag, true);
      cardsContainer.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
  });

  // Tratar navegação do histórico (botões Voltar/Avançar do navegador)
  window.addEventListener("popstate", () => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("categoria");
    const tag = params.get("tag");
    if (cat) {
      aplicarFiltro("categoria", cat, false);
    } else if (tag) {
      aplicarFiltro("tag", tag, false);
    } else {
      aplicarFiltro(null, null, false);
    }
  });

  // Filtro inicial baseado na URL atual
  const params = new URLSearchParams(window.location.search);
  const catInicial = params.get("categoria");
  const tagInicial = params.get("tag");
  if (catInicial) {
    aplicarFiltro("categoria", catInicial, false);
  } else if (tagInicial) {
    aplicarFiltro("tag", tagInicial, false);
  }
});
