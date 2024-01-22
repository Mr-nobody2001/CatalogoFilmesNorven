import instanciaAxios from "@/components/service/CriarInstanciaAxios.js";


export const pesquisarFilmesPopulares = async () => {
    try {
        let response = await instanciaAxios().get('/3/movie/popular?&page=1', {
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

export const pesquisarFilmesPorTitulo = async (titulo, pagina = 1) => {
    try {
        let response = await instanciaAxios().get('3/search/movie', {
            params: {
                query: titulo,
                page: pagina,
                sort_by: "popularity.desc",
                language: "pt-BR",
                include_video: "true",
            }
        });

        return response.data;
    } catch (error) {
        console.error('Erro na requisição: ', error.message);
    }
}