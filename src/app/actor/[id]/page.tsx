import Album from "@/components/actor/Album";
import AnotherMovies from "@/components/actor/AnotherMovies";
import DetailsActor from "@/components/actor/DetailsActor";
import ProfileImage from "@/components/actor/ProfileImage";
import Container from "@/components/template/Container";
import Wrap from "@/components/template/Wrap";
import { getActorDetails } from "@/lib/MovieAPI";
import { Suspense } from "react";

interface ActorProps {
    params: Promise<{ id: string }>;
}

export default async function Actor({ params }: ActorProps) {
    // Await params first
    const { id } = await params;
    
    if(!id) {
        throw new Error("Actor ID is required");
    }

    // Fetch data with proper error handling
    try {
        const actor = await getActorDetails(id);
        
        if(!actor) {
            throw new Error("Actor not found");
        }

        return (
            <Wrap>
                <Container bigPadding className="mt-32 md:mt-44 min-h-96 w-full">
                    <Suspense fallback={<div>Loading profile...</div>}>
                        <ProfileImage 
                            url={actor.profileImage} 
                            imgAlt={`Image of ${actor.name}`}
                        />
                        <DetailsActor actor={actor} />
                    </Suspense>
                </Container>
                {/* Separate Suspense boundaries to prevent blocking */}
                <Suspense fallback={<div>Loading album...</div>}>
                    <Album idActor={id} />
                </Suspense>
                <Suspense fallback={<div>Loading filmography...</div>}>
                    <AnotherMovies idActor={id} />
                </Suspense>
            </Wrap>
        );
    } catch (error) {
        console.error('Error loading actor:', error);
        throw error; // Let error boundary handle it
    }
}
// interface ActorProps {
//     params: Promise<{id: string}>;
// }

// export default async function Actor({params}: ActorProps) {
//     const { id } = await params;
//     const actor = await getActorDetails(String(id));

//     return (
//         <Wrap>
//             <Container bigPadding className="mt-32 md:mt-44 min-h-96 w-full">
//                 <ProfileImage 
//                     url={actor.profileImage} 
//                     imgAlt={`Image of ${actor.name}`}
//                 />
//                 <DetailsActor actor={actor} />
//             </Container>
//             <Album idActor={String(id)} />
//             <AnotherMovies idActor={String(id)} />
//         </Wrap>
//     );

// }