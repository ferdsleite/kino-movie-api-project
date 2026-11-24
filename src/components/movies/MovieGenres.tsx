import Flex from "../template/Flex";
import mergeClasses from "@/utils/mergeClasses";

interface MovieGenresProps {
    genres?: Genre[];
    big?: boolean;
}

// Genres now arrive with the movie data from the server,
// so this no longer calls /api/genres for every card.
export default function MovieGenres({ genres, big }: MovieGenresProps) {
    if (!genres || genres.length === 0) return null;

    return (
        <Flex className="flex-wrap justify-start">
            {genres.map((genre) => {
                return (
                    <span 
                        key={genre.id} 
                        className={mergeClasses(`bg-red-kino/50 font-semibold
                            backdrop-blur-md p-1 rounded-lg text-xs`,
                            {"text-lg": big},
                    )}>
                        {genre.name}
                    </span>
                )
            })}
        </Flex>
    );
}
