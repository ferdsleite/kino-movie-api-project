import Container from "../template/Container";
import Description from "../template/Description";
import Flex from "../template/Flex";
import Title from "../template/Title";
import MoviePoster from "./MoviePoster";
import MovieGenres from "./MovieGenres";
import Vote from "./Vote";

interface CardMovieDetailsProps {
    movie: MovieDetails;
}

export default function CardMovieDetails({ movie }: CardMovieDetailsProps) {
    return (
        <Container>
            <Flex col className={`bg-neutral-950 rounded-lg mt-8
            p-4 md:p-8 lg:flex-row`}>
                    <MoviePoster url={movie.linkPosterImage}  title={movie.title}/>
                    <Flex col className="m-3 ml-8 gap-8 text-xl items-start">
                        <Title text={movie.title} align="center" className="lg:text-start my-0 lg:my-5" />
                        <Description text={movie.overview} className="text-base mt-0"/>
                        <p className="text-sm text-zinc-500">Release Date: {new Intl.DateTimeFormat("en-US").format(
                            new Date(`${movie.releaseDate}`)
                        )}</p>
                        <p className="text-sm text-zinc-500">Duration: {movie.duration} min</p>
                        <p className="text-sm text-zinc-500">Original Title: {movie.originalTitle}</p>
                        <Flex col className="justify-start items-start w-full">
                            <MovieGenres idMovie={movie.id} genresDefault={movie.genres} big />
                            <Vote vote={movie.vote} big />
                        </Flex>                        
                    </Flex>
                </Flex>
        </Container>
    );
}