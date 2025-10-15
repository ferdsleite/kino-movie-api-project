import mergeClasses from "@/utils/mergeClasses";
import { button } from "framer-motion/client";

interface ButtomProps {
    text: string;
    icon?: React.JSX.Element;
    className?: string
}

export default function Buttom({ text, icon, className}: ButtomProps) {
    return (
        <button 
            className={mergeClasses(`
                flex gap-1 items-center justify-center
                px-3 py-2 font-semibold rounded-lg
                hover:brightness-75 hover:transition-all
                bg-red-kino
                `)}
        >
            {text}
            {icon}
        </button>
    )
}