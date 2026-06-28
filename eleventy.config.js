export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addPassthroughCopy("./src/img");

  eleventyConfig.addFilter("limit", (arr, limit) => {
    return arr.slice(0, limit);
  });

  eleventyConfig.addFilter("reverse", (arr) => {
    return Array.isArray(arr) ? arr.slice().reverse() : arr;
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