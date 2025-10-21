import { getAnotherMovies } from "@/lib/MovieAPI";
import Container from "../template/Container";
import MoviesList from "../movies/MoviesList";

interface AnotherMoviesProps {
    idActor: string;
}

export default async function AnotherMovies({ idActor }: AnotherMoviesProps) {  
    try {
        const movies = await getAnotherMovies(idActor);
        const limitedMovies = movies.slice(0, 9);
    
        return (
            <Container className="my-16 bg-neutral-950 rounded-lg lg:pt-10" >
                <MoviesList movies={limitedMovies} title="Filmography"/>
            </Container>
        );
    } catch (error) {
        console.error('Error loading movies', error);
        return <div>Failed to load Filmography</div>;
    }
}