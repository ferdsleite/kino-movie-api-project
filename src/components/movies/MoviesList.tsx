"use client";

import Link from "next/link";
import Container from "../template/Container";
import Grid from "../template/Grid";
import Title from "../template/Title";
import MovieCard from "./MovieCard";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface MoviesListProps {
    movies: Movie[];
    className?: string;
    title: string;
    smallText?: boolean; 
}
export default function MoviesList({ movies, className, title, smallText }: MoviesListProps) {           
    const [selectedIndice, setSelectedIndice] = useState<null | number>(null);
    return (
        <Container className={className}>
            <Title className="pl-2" align="center" text={title} smallText={smallText} />
            <Grid className="md:grid-cols-2 lg:grid-cols-3 py-5 gap-5">
                {movies.map((movie, indice) => {
                    return (
                        <Link 
                            href={`/movies/${movie.id}`} 
                            key={movie.id} 
                            className="relative group block p-2 h-full w-full"
                            onMouseEnter={() => setSelectedIndice(indice)}
                            onMouseLeave={() => setSelectedIndice(null)}
                        >
                            <AnimatePresence>
                                {selectedIndice === indice && (
                                <motion.span
                                    className="absolute inset-0 h-full w-full bg-red-kino/50 block rounded-3xl"
                                    layoutId="hoverBackground"
                                    initial={{ opacity: 0 }}
                                    animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                    }}
                                    exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                    }}
                                />
                                )}
                            </AnimatePresence>
                            <MovieCard movie={movie} key={movie.id}/>
                        </Link>
                    )
                })}
            </Grid>
        </Container>
    )
}