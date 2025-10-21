import Title from "../template/Title";
import Wrap from "../template/Wrap";
import Carrossel from "../template/Carrossel";
import Container from "../template/Container";
import Flex from "../template/Flex";
import Image from "next/image";
import { getActorImages } from "@/lib/MovieAPI";

interface AlbumProps {
    idActor: string;
}

export default async function Album({ idActor }: AlbumProps) {
    try {
        const imagesResponse = await getActorImages(idActor);
        
        if (!imagesResponse?.length) {
            return null;
        }

        const imagesForEachSlide = 3;
        const images = [];
        
        // Correctly chunk the images array
        for (let i = 0; i < imagesResponse.length; i += imagesForEachSlide) {
            const chunk = imagesResponse.slice(i, i + imagesForEachSlide);
            if (chunk.length === imagesForEachSlide) {
                images.push(chunk);
            }
        }

        if (images.length === 0) {
            return null;
        }

        return (
            <Wrap>
                <Title 
                    className="w-full my-2" 
                    smallText 
                    text="Artist's Photo Album" 
                    align="center" 
                />
                <Carrossel slideAutomatic={false}>
                    {images.map((imageGroup: string[], idx: number) => (
                        <Container key={idx}>
                            <Flex className="justify-between w-full p-0 m-0">
                                {imageGroup.map((linkImage) => (
                                    <Wrap
                                        key={linkImage}
                                        className="h-40 sm:h-52 md:h-96 lg:min-h-[600px] relative overflow-hidden rounded-md lg:rounded-lg"
                                    >
                                        <Image 
                                            src={linkImage} 
                                            alt="Actor Image" 
                                            className="object-cover" 
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            fill
                                            priority={idx === 0}
                                        /> 
                                    </Wrap>
                                ))}
                            </Flex>
                        </Container>
                    ))}
                </Carrossel>
            </Wrap>
        );
    } catch (error) {
        console.error('Error loading album:', error);
        return null;
    }
}

// export default async function Album({ idActor }: AlbumProps) {
//     const imagesResponse = await getActorImages(idActor);

//     const imagesForEachSlide = 3;
//     let remainingImages = imagesResponse;
//         const images = [];
//         while (remainingImages.length >= imagesForEachSlide) {
//             images.push(remainingImages.slice(0, imagesForEachSlide));
//         }

//     if(images.length <= 0) {
//         return;
//     }

//     return (
//         <Wrap>
//             <Title className="w-full" smallText text="Artist's Photo Album" align="center" />
//             <Carrossel>
//                 {images.map((imageGroup: string[], idx: number) => {
//                     return (
//                         <Container key={idx}>
//                             <Flex className="justify-between w-full">
//                                 {imageGroup.map((linkImage) => {
//                                     return (
//                                         <Wrap
//                                             key={linkImage}
//                                             className={`h-36 sm:h-52 md:h-96 lg:min-h-[600px]
//                             relative overflow-hidden rounded-lg`}
//                                         >
//                                            <Image src={linkImage} alt="Actor Image" className="object-contain" sizes="40vw" fill /> 
//                                         </Wrap>
//                                     );
//                                 })}
//                             </Flex>
//                         </Container>
//                     );
//                 })}
//             </Carrossel>
//         </Wrap>
//     )
// }