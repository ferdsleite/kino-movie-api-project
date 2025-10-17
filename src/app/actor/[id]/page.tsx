
'use client';

import Album from "@/components/actor/Album";
import AnotherMovies from "@/components/actor/AnotherMovies";
import DetailsActor from "@/components/actor/DetailsActor";
import ProfileImage from "@/components/actor/ProfileImage";
import Container from "@/components/template/Container";
import Wrap from "@/components/template/Wrap";
import useMovieAPI from "@/hooks/useMovieAPI";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


export default function Actor() {
    const [actor, setActor] = useState<ActorDetails | null>(null);
    const { id } = useParams();
    const { getActorDetails } = useMovieAPI();
    useEffect(() => {
        getActorDetails(String(id)).then(setActor)
    }, []);
    return (
        <Wrap>
            {actor && (
                <Container className="mt-32 md:mt-44 min-h-96 w-full">
                    <ProfileImage url={actor.profileImage} imgAlt={`Image of ${actor.name}`} />
                    <DetailsActor actor={actor} />
                </Container>
            )}
            { actor && <Album idActor={String(id)} />}
            {actor && <AnotherMovies idActor={String(id)} />}
        </Wrap>
    );

}