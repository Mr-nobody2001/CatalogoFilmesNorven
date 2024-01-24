import instanciaAxios from "@/service/CriarInstanciaAxios.js";

export const pesquisarTitulosPopulares = async (tipoConteudo = "filmes") => {
    try {
        const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

        let response = await instanciaAxios().get(`/3/${conteudo}/popular?&page=1`, {
            params: {
                language: "pt-BR",
                page: 1,
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição: ', error.message);
    }
}

export const pesquisarPorTitulo = async (titulo = "a", tipoConteudo = "filmes", pagina = 1) => {
    try {
        const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

        let response = await instanciaAxios().get(`3/search/${conteudo}`, {
            params: {
                query: titulo,
                page: pagina,
                sort_by: "popularity.desc",
                language: "pt-BR",
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição: ', error.message);
    }
}

export const pesquisarTituloPorId = async (id, tipoConteudo = "filmes") => {
    try {
        const conteudo = tipoConteudo === "filmes" ? "movie" : "tv";

        let response = await instanciaAxios().get(`3/${conteudo}/${id}`, {
            params: {
                append_to_response: "credits,videos",
                language: "pt-BR",
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição: ', error.message);
    }
}