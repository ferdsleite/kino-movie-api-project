import Link from "next/link";
import Container from "../template/Container";
import Grid from "../template/Grid";
import Title from "../template/Title";
import MovieCard from "./MovieCard";

interface MoviesListProps {
    movies: Movie[];
    className?: string;
    title: string;
    smallText?: boolean; 
}
export default function MoviesList({ movies, className, title, smallText }: MoviesListProps) {
 return (
    <Container className={className}>
        <Title className="pl-2" align="center" text={title} smallText={smallText} />
        <Grid className="md:grid-cols-2 lg:grid-cols-3 py-5 gap-5">
            {movies.map((movie) => {
                return (
                    <Link href={`/movies/${movie.id}`} key={movie.id} className="relative group block p-2 h-full w-full">
                        <MovieCard movie={movie} key={movie.id}/>
                    </Link>
                )
            })}
        </Grid>
    </Container>
 )
}