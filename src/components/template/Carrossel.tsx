'use client';

import { Children, cloneElement } from "react";
import Container from "./Container";
import Wrap from "./Wrap";
import Flex from "./Flex";
import mergeClasses from "@/utils/mergeClasses";
import { CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";

interface CarrosselProps {
    children: JSX.Element[],
    slideAutomatic?: boolean,
}

function BotaoLateral(props:{ left?:boolean, right?:boolean, children:React.ReactNode }) {
    return (
            <button className={mergeClasses(`group absolute top-0 h-full
                cursor-pointer flex items-center justify-center px-4
                focus:outline-none
                `, {"left-0":props.left, "right-0":props.right})}>
                
                <span className={`inline-flex h-10 w-10 items-center justify-center
                    rounded-full bg-gray-700/30
                    group-focus:ouline-none group-focus:ring-4 group-focus:ring-white
                    group:hoverbg-gray-800/60
                `}>
                    {props.children}
                </span>
            </button>        
    )
}

export default function Carrossel({ children, slideAutomatic }:CarrosselProps) {
    const indiceAtual = 0;
    const NUMERO_DE_ITEMS = children.length;

    return (
        <Wrap className="bg-yellow-500">
            <Container className="bg-red-200">
                <Wrap className="bg-red-400">
                    <div className="relatve rounded-lg mb-5">
                        {Children.map(children, (filho:JSX.Element, i) => {
                            const propsFilho = filho.props;
                            return cloneElement(filho, {
                                className: `${i === indiceAtual ? "" : "hidden"}`
                            })
                        })}
                    </div>
                    <Flex className="absolute bottom-5 left-1/2 z-30 translate-x-1/2 gap 2">
                        {Array.from({length: NUMERO_DE_ITEMS}).map((_, i) => {
                            return (
                                <button key={i} className={mergeClasses(
                                    "h3, w-3 rounded-full bg-gray-800",
                                    {"bg-gray-500": i === indiceAtual}
                                )}></button>
                        )
                        })}
                    </Flex>
                </Wrap>
            </Container>
            <BotaoLateral left>
                <CaretLeftIcon size={20} />
                <span className="hidden">Anterior</span>
            </BotaoLateral>
            <BotaoLateral right>
                <CaretRightIcon size={20} />
                <span className="hidden">Proximo</span>
            </BotaoLateral>
        </Wrap>
    )
}