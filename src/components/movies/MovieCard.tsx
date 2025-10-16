import { Film } from "lucide-react";
import Flex from "../template/Flex";
import Title from "../template/Title";
import Wrap from "../template/Wrap";
import ImageWithFallback from "../template/ImageWithFallback";
import MovieGenres from "./MovieGenres";
import Vote from "./Vote";
import mergeClasses from "@/utils/mergeClasses";

interface MovieCardProps {
    movie: Movie;
    className?: string;
}

export default function MovieCard({ movie, className }: MovieCardProps) {
    return (
        <Wrap className={mergeClasses(`
            rounded-2xl h-60 max-h-60 bg-black
            border border-white/[0.2] group-hover:border-red-kino
            relative z-20`,
            className
            )}>
            <ImageWithFallback 
                url={movie.linkBgImage} 
                imgAlt={`Movie background image: ${movie.title}`}
                className="opacity-40 group-hover:opacity-15 transition-all"
            >
                <Film size={100} className="w-1/2" />
            </ImageWithFallback>
            <Flex col className="h-60 z-50 justify-between py-8 px-4">
                <Title text={movie.title} smallText align="left" />
                <Flex col className="justify-start items-start w-full">
                    <MovieGenres idMovie={movie.id} />
                    <Vote vote={movie.vote} />
                </Flex>
            </Flex>
        </Wrap>
    )
}