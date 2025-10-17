import { useEffect, useState } from "react";
import Title from "../template/Title";
import Wrap from "../template/Wrap";
import useMovieAPI from "@/hooks/useMovieAPI";
import Carrossel from "../template/Carrossel";
import Container from "../template/Container";
import Flex from "../template/Flex";
import Image from "next/image";

interface AlbumProps {
    idActor: string;
}

export default function Album({ idActor }: AlbumProps) {
    const [images, setImages] = useState<string[][]>([]);
    const { getActorImages } = useMovieAPI();

    useEffect(() => {
        getActorImages(idActor)
            .then((images) => {
                const imagesForEachSlide = 3;
                let remainingImages = images.slice();
                const result: string[][] = [];
                while (remainingImages.length > 0) {
                    result.push(remainingImages.slice(0, imagesForEachSlide));
                    remainingImages = remainingImages.slice(imagesForEachSlide);
                }
                setImages(result);
            })
            .catch(() => {
                setImages([]);
            });
    }, [idActor, getActorImages]);

    if(images.length <= 0) {
        return;
    }

    return (
        <Wrap>
            <Title className="w-full" smallText text="Artist's Photo Album" align="center" />
            <Carrossel>
                {images.map((imageGroup: string[], idx: number) => {
                    return (
                        <Container key={idx}>
                            <Flex className="justify-between w-full">
                                {imageGroup.map((linkImage) => {
                                    return (
                                        <Wrap
                                            key={linkImage}
                                            className={`h-36 sm:h-52 md:h-96 lg:min-h-[600px]
                            relative overflow-hidden rounded-lg`}
                                        >
                                           <Image src={linkImage} alt="Actor Image" className="object-contain" sizes="40vw" fill /> 
                                        </Wrap>
                                    );
                                })}
                            </Flex>
                        </Container>
                    );
                })}
            </Carrossel>
        </Wrap>
    )
}