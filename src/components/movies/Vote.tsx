import { Star } from "lucide-react";
import Flex from "../template/Flex";
import mergeClasses from "@/utils/mergeClasses";

interface VoteProps {
    vote: number;
    big?: boolean;
}

export default function Vote({ vote, big }: VoteProps) {
    return (
        <Flex className="mt-2">
            <Star className={mergeClasses(
                "text-amber-400",
                {"text-3xl": big})} />
                <span className={mergeClasses("font-semibold",  {"text-xl": big})}>
                    {vote.toFixed(1)}/10
                </span>
        </Flex>
    )
}