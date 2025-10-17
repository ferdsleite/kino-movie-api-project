import { select } from "framer-motion/client";
import { title } from "process";

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
                releaseDate: new Date(item.release_date),
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

   async function getMovieDetails(movieId: string):Promise<MovieDetails> {        
       const { json } = await get(
            `/movie/${movieId}`, 
            "append_to_response=credits"
        );
            return {
                id: json.id,
                title: json.title,
                overview: json.overview,
                releaseDate: new Date(json.release_date),
                vote: json.vote_average,
                linkBgImage: imageURLFormat(json.backdrop_path),
                linkPosterImage: imageURLFormat(json.poster_path),
                originalTitle: json.original_title,
                genres: json.genres.map((g: any) => {
                    return {id: g.id, name: g.name} 
                }),
                actors: json.credits.cast.slice(0,10).map((actor: any) => {
                    return {
                        id: actor.id,
                        name: actor.name,
                        profileImage: imageURLFormat(actor.profile_path),
                        character: actor.character,
                    }
                }),
                duration: json.runtime
            };
    }

    async function getSimilarMovies(idMovie: string): Promise<Movie[]> {
        const { json } = await get(`/movie/${idMovie}/similar`);
        const selected = json.results.slice(0, 9);
        return selected.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                overview: item.overview,
                releaseDate: new Date(item.release_date),
                vote: item.vote_average,
                linkBgImage: imageURLFormat(item.backdrop_path),
                linkPosterImage: imageURLFormat(item.poster_path)
            }

        })
    }

    async function getActorDetails(idActor: string): Promise<ActorDetails> {
        const { json } = await get(`/person/${idActor}?language=en-US`);
        return {
            id: json.id,
            name: json.name,
            bio: json.biography,
            profileImage: imageURLFormat(json.profile_path),
            birthDate: new Date(json.birthday),
            birthPlace: json.place_of_birth,
            genre: 
                json.gender === 1 ? "Woman" : json.gender === 2 ?  "Man" : "Unknow",
        };
    }

    async function getActorImages(idActor: string) {
        const { json } = await get(`/person/${idActor}/images`);
        return json.profiles.map((img: any) => imageURLFormat(img.file_path))
    }

    async function getAnotherMovies(idActor: string): Promise<Movie[]> {
        const { json } = await get(`/person/${idActor}/movie_credits`);
        const actorMovies = json.cast.slice(0, 9);
        return actorMovies.map((item: any) => {
            return {
                id: item.id,
                title: item.title,
                overview: item.overview,
                releaseDate: new Date(item.release_date),
                vote: item.vote_average,
                linkBgImage: imageURLFormat(item.backdrop_path),
                linkPosterImage: imageURLFormat(item.poster_path)
            }
        })
    }

    return {
        getLastMovies,
        getMovieGenres,
        getMovieDetails,
        getSimilarMovies,
        getActorDetails,
        getActorImages,
        getAnotherMovies,
    }
}