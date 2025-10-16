interface Movie {
    id: string;
    title: string;
    overview: string;
    linkBgImage: string;
    linkPosterImage: string;
    vote: number;
    launchDate: Date;
}

type Genre = {
    id: string;
    name: string;
}