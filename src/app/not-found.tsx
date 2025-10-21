import Description from "@/components/template/Description"
import Flex from "@/components/template/Flex"
import Title from "@/components/template/Title"
import Link from "next/link"

export default function NotFound() {
    return (
        <Flex col className="mt-32 w-full">
            <Title text="404" align="center" className="mb-8"></Title>
            <Description 
            	text="Page not found"
				className="text-lg font-semibold"
            >
            </Description>
			<Link
				href="/movies"
				className="bg-red-kino font-bold p-2 rounded-lg hover:brightness-75"
			>
                Back to Home
            </Link>
        </Flex>
)
}