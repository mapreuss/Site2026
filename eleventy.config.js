export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/img");

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("sortBy", (arr, property) => {
    if (!Array.isArray(arr) || !property) return arr;
    const keys = property.split(".");
    return arr.slice().sort((a, b) => {
      const aValue = keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""), a);
      const bValue = keys.reduce((obj, key) => (obj && obj[key] !== undefined ? obj[key] : ""), b);
      return String(aValue).localeCompare(String(bValue), undefined, { numeric: true, sensitivity: "base" });
    });
  });

  // Adiciona o filtro customizado
  eleventyConfig.addFilter("tagsComContagem", function(colecao) {
    let contagemTags = {};

    colecao.forEach(item => {
      // Pega as tags do post, se não houver, usa um array vazio
      let tags = item.data.tags || [];

      tags.forEach(tag => {
        // Ignora a tag "portfolio" se ela for a tag que cria a coleção
        if (tag !== "portfolio" && tag !== "post") {
          if (!contagemTags[tag]) {
            contagemTags[tag] = 0;
          }
          contagemTags[tag]++;
        }
      });
    });

    // Converte o objeto em um array para facilitar o uso no template (HTML)
    let listaTags = [];
    for (let tag in contagemTags) {
      listaTags.push({ 
        nome: tag, 
        quantidade: contagemTags[tag] 
      });
    }

    // Ordena as tags em ordem alfabética
    return listaTags.sort((a, b) => a.nome.localeCompare(b.nome));
  });

  eleventyConfig.addFilter("categoriasComContagem", function(colecao) {
    if (!colecao || !Array.isArray(colecao)) return [];
    let contagemCategoria = {};

    colecao.forEach(item => {
      // Pega as categorias do post, se não houver, usa um array vazio
      let categories = item.data?.categories || [];
      if (typeof categories === "string") {
        categories = [categories];
      }

      categories.forEach(categoria => {
        // Ignora a categoria se ela for nula ou as tags do sistema
        if (categoria && categoria !== "portfolio" && categoria !== "post") {
          if (!contagemCategoria[categoria]) {
            contagemCategoria[categoria] = 0;
          }
          contagemCategoria[categoria]++;
        }
      });
    });

    // Converte o objeto em um array para facilitar o uso no template (HTML)
    let listaCategorias = [];
    for (let categoria in contagemCategoria) {
      listaCategorias.push({ 
        nome: categoria, 
        quantidade: contagemCategoria[categoria] 
      });
    }

    // Ordena as categorias em ordem alfabética
    return listaCategorias.sort((a, b) => a.nome.localeCompare(b.nome));
  });

  eleventyConfig.addFilter("normalizarCategorias", function(categories) {
    if (!categories) return [];
    if (typeof categories === "string") return [categories];
    if (Array.isArray(categories)) return categories.filter(Boolean);
    return [];
  });

  eleventyConfig.addFilter("categoriaListaParaData", function(categories) {
    if (!categories) return "";
    let lista = [];
    if (typeof categories === "string") {
      lista = [categories];
    } else if (Array.isArray(categories)) {
      lista = categories;
    }
    return lista
      .filter(Boolean)
      .map(c => String(c).trim().toLowerCase())
      .join("|");
  });

  eleventyConfig.addFilter("filtrarTagsItem", function(tags) {
  if (!tags) return [];
    // Remove a tag "portfolio" e pega apenas as 3 primeiras restantes
    return tags.filter(tag => tag !== "portfolio").slice(0, 3);
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
}