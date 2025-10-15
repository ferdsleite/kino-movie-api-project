import mergeClasses from "@/utils/mergeClasses";

interface TitleProps {
    text: string;
    smallText?: boolean;
    className?: string; 
    align?: "center" | "right" | "left";
}

export default function Title({ text, smallText, className, align}:TitleProps) {
    return (
        <h1
            className={mergeClasses(`
                my-5 text-3xl px-0 font-bold w-full 
                md:text-4xl xl:text-5xl`,
                {
                    "font-semibold text-2xl md:text-3xl xl:text-4xl": smallText,
                    [`text-${align}`]: align
                }, 
                className
            )}
        >
            {text}
        </h1>
    )
}