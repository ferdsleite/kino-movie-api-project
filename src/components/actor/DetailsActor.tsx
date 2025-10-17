import { XCircle } from "lucide-react"
import Description from "../template/Description"
import Flex from "../template/Flex"
import Title from "../template/Title"

interface DetailsActorProps {
    actor: ActorDetails
}

function WithoutBio() {
    return (
        <Flex className="text-zinc-600">
            <XCircle size={70}/>
            <Title text="Biography not found!" align="center" smallText/>
            <XCircle size={70}/>
        </Flex>
    )
}

export default function DetailsActor({ actor }: DetailsActorProps) {
    return (
        <Flex col className={`bg-zinc-900 rounded-lg
            w-full justify-between items-center
            pt-16 md:pt-20 lg:pt-26`}>
            <Title text={actor.name} align="center" smallText />
            <Flex className="gap-5 flex-wrap font-medium">
                {actor.genre && (<span>Genre: {actor.genre}</span>)}
                {actor.birthDate && (<span>Birthday: {new Intl.DateTimeFormat("en-US").format(actor.birthDate)}</span>)}
                {actor.birthPlace && (<span>Birth Place: {actor.birthPlace}</span>)}
            </Flex>
            <Flex col className="p-3 flex-1">
                {actor.bio ? (
                    <>
                        <Title text="Biography" align="center" smallText  />
                        <Description text={actor.bio} className="text-justify mx-10 my-5 text-xs pl-4 pr-4" />
                    </>
                ) : <WithoutBio/>}
                
            </Flex>
        </Flex>
    )
}