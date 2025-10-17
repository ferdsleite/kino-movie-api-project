interface Movie {
    id: string;
    title: string;
    overview: string;
    linkBgImage: string;
    linkPosterImage: string;
    vote: number;
    releaseDate: Date;
}

interface MovieDetails extends Movie {
    originalTitle: string;
    genres: Genre[];
    actors: Actor[];
    duration: number;
}

type Genre = {
    id: string;
    name: string;
}

type Actor = {
    id: string;
    name: string;
    profileImage: string;
    character: string;
}

type ActorDetails = {
    id: string;
    name: string;
    profileImage: string;
    bio: string;
    birthDate: Date;
    genre: string;
    birthPlace: string
}
