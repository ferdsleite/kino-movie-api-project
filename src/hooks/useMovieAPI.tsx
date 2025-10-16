const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;
const BG_FILME_URL = process.env.NEXT_PUBLIC_BG_FILME_URL;
const TOKEN_DE_LEITURA = process.env.NEXT_PUBLIC_TOKEN_DE_LEITURA;

console.log("URL_BASE:", process.env.NEXT_PUBLIC_URL_BASE);

export default function useMovieAPI() {
    async function get(urlFragment: string, params?: string) {
        const fragment = urlFragment.startsWith("/") 
            ? urlFragment.substring(1) 
            : urlFragment;
        try {
            const response = await fetch(
                `${URL_BASE}/${fragment}?language=en-US&page=1${
					params ? `&${params}` : ""
				}`,
				{
					method: "GET",
					headers: {
						accept: "application/json",
						Authorization: `Bearer ${TOKEN_DE_LEITURA}`,
					},
                });
                const json = await response.json();
                return {
                    json, 
                    status: response.status,
                }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    function imageURLFormat(url: string) {
        if(!url) return "";
        return `${BG_FILME_URL}${url}`; 
    }

    async function getLastMovies():Promise<Movie[]> {        
       const { json, status } = await get("movie/now_playing");
       const someMovies = json.results.slice(0, 12);
       return someMovies.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                overview: item.overview,
                launchDate: new Date(item.release_date),
                vote: item.vote_average,
                linkBgImage: imageURLFormat(item.backdrop_path),
                linkPosterImage: imageURLFormat(item.poster_path)
            };
       });
    }

    async function getMovieGenres(movieId: string) {
        const {json} = await get(`/movie/${movieId}`);
        return json.genres.map((genre: any) => {
            return {
                id: genre.id,
                name: genre.name
            }
        })
    }

    return {
        getLastMovies,
        getMovieGenres
    }
}