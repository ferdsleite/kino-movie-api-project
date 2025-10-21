import mergeClasses from "@/utils/mergeClasses";

interface DescriptionProps {
    text: string;
    className?: string;
}

export default function Description({ text, className}: DescriptionProps) {
    return (
        <p className={mergeClasses(
            `mt-2 text-zinc-400 tracking-wide leading-normal text-xs sm:text-sm md:text-md lg:text-base text-start md:text-justify lg:text-justify`,
            className
        )}>
            {text}
        </p>
    )
}