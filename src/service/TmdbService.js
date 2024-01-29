import instanciaAxios from "@/service/CriarInstanciaAxios.js";

export const pesquisarTitulosPopulares = async (tipoConteudo = "filmes") => {
  try {
    const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

    let response = await instanciaAxios().get(
      `/3/${conteudo}/popular?&page=1`,
      {
        params: {
          language: "pt-BR",
          page: 1,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro na requisição: ", error.message);
  }
};

export const pesquisarPorTitulo = async (
  titulo = "a",
  tipoConteudo = "filmes",
  pagina = 1
) => {
  try {
    const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

    let response = await instanciaAxios().get(`3/search/${conteudo}`, {
      params: {
        query: titulo,
        page: pagina,
        sort_by: "popularity.desc",
        language: "pt-BR",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro na requisição: ", error.message);
  }
};

export const pesquisarTituloPorId = async (id, tipoConteudo = "filmes") => {
  try {
    const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

    let response = await instanciaAxios().get(`3/${conteudo}/${id}`, {
      params: {
        append_to_response: "credits,videos",
        language: "pt-BR",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro na requisição: ", error.message);
  }
};

export const alterarListaFavoritos = async (
  id,
  tipoConteudo = "filmes",
  favoritar = true,
) => {
  try {
    const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

    const corpoRequisicao = {
      media_type: conteudo,
      media_id: id,
      favorite: favoritar,
    };

    let response = await instanciaAxios().post(
      `3/account/20916313/favorite`,
      corpoRequisicao
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const pesquisarListaFavoritos = async (tipoConteudo = "filmes", pagina) => {
  try {
    const conteudo = tipoConteudo === "filmes" ? "movies" : "tv";

    let response = await instanciaAxios().get(
      `3/account/20916313/favorite/${conteudo}`,
      {
        params: {
          language: "pt-BR",
          page: pagina,
          sort_by: "created_at.asc",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro na requisição: ", error.message);
  }
};
