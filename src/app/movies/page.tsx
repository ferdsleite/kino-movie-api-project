import { getLastMovies } from "@/lib/MovieAPI";
import Wrap from "@/components/template/Wrap";
import Carrossel from "@/components/template/Carrossel";
import CardHighlightedMovie from "@/components/movies/CardHighlightedMovie";
import MoviesList from "@/components/movies/MoviesList";

export default  async function Movies() {
    const movies: Movie[] = await getLastMovies();

    return (
        <Wrap>
            <Carrossel slideAutomatic={true}>
                {movies.map((movie) => {
                    return <CardHighlightedMovie movie={movie} key={movie.id} />
                })}
            </Carrossel>
            <MoviesList movies={movies} title="Last Movies" />
        </Wrap>
    )

}