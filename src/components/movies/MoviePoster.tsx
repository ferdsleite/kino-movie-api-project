import { Film } from "lucide-react";
import ImageWithFallback from "../template/ImageWithFallback";
import Wrap from "../template/Wrap";

interface MoviePosterProps {
    url: string;
    title: string;
}

export default function MoviePoster({ url, title }:MoviePosterProps) {
    return (       
        <Wrap className={`
                h-72 w-48 md:h-96 md:w-80 lg:h-[700px] lg:w-[500px]
                relative overflow-hidden rounded-lg m-auto
            `}>
                <ImageWithFallback url={url} imgAlt={`Movie Poster ${title}`}>
                    <Film className="w-1/2 h-2/3 text-slate-800"></Film>
                </ImageWithFallback>
        </Wrap>
    )
}