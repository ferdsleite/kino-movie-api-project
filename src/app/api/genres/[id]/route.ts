import { NextResponse } from "next/server";
import { getMovieGenres } from "@/lib/MovieAPI";


export async function GET(_req: Request, context: { params: any }) {
    try {
        // params may be a Promise-like object in newer Next runtimes — await before using
        const { id } = await context.params;
        const genres = await getMovieGenres(id);
        return NextResponse.json(genres);
    } catch (error) {
        console.error("Error fetching genres", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}