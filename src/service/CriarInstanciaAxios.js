import axios from "axios";


const instanciaAxios = () => axios.create({
    baseURL: "https://api.themoviedb.org",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_APP_TMDB_TOKEN}`,
    },
});

export default instanciaAxios;