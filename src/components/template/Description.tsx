import mergeClasses from "@/utils/mergeClasses";

interface DescriptionProps {
    text: string;
    className?: string;
}

export default function Description({ text, className}:DescriptionProps) {
    return (
        <p className={mergeClasses(
            `mt-2 text-zinc-500 tracking-wide leading-relaxed 
            text-sm text-justify lg:text-md`,
            className
        )}>
            {text}
        </p>
    )
}