import mergeClasses from "@/utils/mergeClasses";

interface DescriptionProps {
    text: string;
    className?: string;
}

export default function Description({ text, className}: DescriptionProps) {
    return (
        <p className={mergeClasses(
            `mt-2 text-zinc-400 tracking-wide leading-normal text-sm md:text-base lg:text-base text-justify`,
            className
        )}>
            {text}
        </p>
    )
}