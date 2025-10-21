import { User } from "lucide-react";
import Flex from "../template/Flex";
import ImageWithFallback from "../template/ImageWithFallback";
import Wrap from "../template/Wrap";

interface ProfileImageProps {
    url: string;
    imgAlt: string;
}

export default function ProfileImage({ url, imgAlt}: ProfileImageProps) {
    return (
            <div className={`absolute rounded-full p-3 bg-zinc-900
                w-60 h-60 md:w-75 md:h-72 lg:w-80 lg:h-80
                left-1/2 transform -translate-x-1/2 -translate-y-3/4 `}>
                    <Wrap className="relative h-full w-full rounded-full">
                        <ImageWithFallback url={url} imgAlt={imgAlt}>
                            <Flex className="w-full h-full">
                                <User className="w-3/4 h-4/5 text-zinc-500"/>
                            </Flex>
                        </ImageWithFallback>
                    </Wrap>
            </div>
    )
}