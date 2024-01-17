import instanciaAxios from "@/components/service/CriarInstanciaAxios.js";


export const pesquisarFilmesPopulares = async () => {
    try {
        let response = await instanciaAxios().get('/3/movie/popular?language=en-US&page=1');

        return response.data;
    } catch (error) {
        console.error('Erro na requisição: ', error.message);
    }
}