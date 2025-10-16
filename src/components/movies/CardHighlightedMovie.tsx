import Link from "next/link";
import Container from "../template/Container";
import Description from "../template/Description";
import Flex from "../template/Flex";
import Title from "../template/Title";
import MoviePoster from "./MoviePoster";

interface CardHighlightedMovieProps {
    movie: Movie;
    className?: string;


}
export default function CardHighlightedMovie({ 
    movie, 
    className,
}: CardHighlightedMovieProps) {
    return (
        <Container className={className}>
            <Flex className="gap-8 flex-col-reverse lg:flex-row">
                <Flex col className="flex-1 items-start">
                    <Title align="left" text={movie.title} />
                    <Description text={movie.overview} className="text-xl text-justify"/>
                    <Link 
                        href={`/movies/${movie.id}`}
                        className={`
                            px-3 py-3 bg-red-kino font-semibold
                            rounded-lg hover:brightness-75
                        `}
                    >
                            More Details
                    </Link>
                </Flex>
                <MoviePoster url={movie.linkPosterImage} title={movie.title} />
            </Flex>
        </Container>
    )
}