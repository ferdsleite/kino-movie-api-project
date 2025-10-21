const URL_BASE = process.env.NEXT_PUBLIC_URL_BASE;
const BG_FILME_URL = process.env.NEXT_PUBLIC_BG_FILME_URL;
const TOKEN_DE_LEITURA = process.env.NEXT_PUBLIC_TOKEN_DE_LEITURA;

    async function get(urlFragment: string, params?: string) {
        if (!URL_BASE || !TOKEN_DE_LEITURA) {
        throw new Error("Missing required environment variables");
    }    
        const fragment = urlFragment.startsWith("/") 
            ? urlFragment.substring(1) 
            : urlFragment;
        
        const url = `${URL_BASE}/${fragment}?language=en-US&page=1${
					params ? `&${params}` : ""
				}`;
    try {
            console.log('Fetching:', { url, fragment });  // Debug log
            
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TOKEN_DE_LEITURA}`,
                },
                next: {revalidate: 3600},
            });

            if (!response.ok) {
                const text = await response.text();
                const errorDetails = {
                    url,
                    method: 'GET',
                    status: response.status,
                    statusText: response.statusText,
                    headers: Object.fromEntries(response.headers.entries()),
                    responseText: text.substring(0, 200),
                    fragment,
                    params
                };
                
                console.error('API Error Response:', JSON.stringify(errorDetails, null, 2));
                throw new Error(`API request failed: ${response.status} ${response.statusText}\nURL: ${url}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType?.includes("application/json")) {
                console.error('Invalid Content-Type:', {
                    expected: 'application/json',
                    received: contentType,
                    url
                });
                throw new Error(`Expected JSON response but got ${contentType}`);
            }            
            
            const json = await response.json();
            return {
                json, 
                status: response.status,
            };
        } catch (error) {
            const errorDetails = {
                url,
                fragment,
                params,
                error: error instanceof Error ? {
                    name: error.name,
                    message: error.message,
                    stack: error.stack
                } : 'Unknown error'
            };
            
            console.error('API Request Error:', JSON.stringify(errorDetails, null, 2));
            throw error;
        }
    }

    function imageURLFormat(url: string) {
        if(!url) return "";
        return `${BG_FILME_URL}${url}`; 
    }

    export async function getLastMovies(): Promise<Movie[]> {        
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

    export async function getMovieGenres(movieId: string) {
        const {json} = await get(`/movie/${movieId}`);
        return json.genres.map((genre: any) => {
            return {
                id: genre.id,
                name: genre.name
            }
        })
    }

   export async function getMovieDetails(movieId: string):Promise<MovieDetails> {        
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

    export async function getSimilarMovies(idMovie: string): Promise<Movie[]> {
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

    export async function getActorDetails(idActor: string): Promise<ActorDetails> {
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

    export async function getActorImages(idActor: string) {
        const { json } = await get(`/person/${idActor}/images`);
        return json.profiles.map((img: any) => imageURLFormat(img.file_path))
    }

    export async function getAnotherMovies(idActor: string): Promise<Movie[]> {
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
