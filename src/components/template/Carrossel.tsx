"use client";

import { Children, cloneElement, useEffect, useRef, useState } from "react";
import Container from "./Container";
import Wrap from "./Wrap";
import Flex from "./Flex";
import mergeClasses from "@/utils/mergeClasses";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface CarrosselProps {
	children: JSX.Element[];
	slideAutomatic?: boolean;
}

function BotaoLateral(props: {
	left?: boolean;
	right?: boolean;
	children: React.ReactNode;
	onClick: () => void;
	onMouseEnter: () => void;
	onMouseLeave: () => void;
}) {
	return (
		<button
			onClick={props.onClick}
			onMouseEnter={props.onMouseEnter}
			onMouseLeave={props.onMouseLeave}
			className={mergeClasses(
				`group absolute top-0 lg:h-full h-1/2
            cursor-pointer flex items-center justify-center px-4
            focus:outline-none
            `,
				{ "left-0": props.left, "right-0": props.right }
			)}
		>
			<span
				className={` inline-flex h-10 w-10 items-center justify-center
                rounded-full bg-gray-700/30
                group-focus:outline-none group-focus:ring-4 group-focus:ring-white
                group-hover:bg-gray-800/60
                `}
			>
				{props.children}
			</span>
		</button>
	);
}

export default function Carrossel({
	children,
	slideAutomatic,
}: CarrosselProps) {
	const carrosselRef = useRef<HTMLDivElement | null>(null);
	const intervaloRef = useRef<NodeJS.Timeout>();
	const animacaoRef = useRef<HTMLDivElement | null>(null);
	const [indiceAtual, setIndiceAtual] = useState(0);
	const NUMERO_DE_ITENS = children.length;
	const TEMPO = 5000;

	function iniciarSlide() {
		if (!slideAutomatic) return;
		if (animacaoRef.current) {
			animacaoRef.current.style.display = "block";
		}
		intervaloRef.current = global.setInterval(() => {
			if (animacaoRef.current) {
				animacaoRef.current.style.display = "block";
			}
			proximoSlide();
		}, TEMPO);
	}

	function pararSlide() {
		if (animacaoRef.current) {
			animacaoRef.current.style.display = "none";
		}
		return clearInterval(intervaloRef.current);
	}

	useEffect(() => {
		iniciarSlide();
		return () => pararSlide();
	}, [NUMERO_DE_ITENS]);

	useEffect(() => {
		if (!carrosselRef.current) return;
		const filhos = Array.from(carrosselRef.current.children);
		const largura = carrosselRef.current.offsetWidth;
		filhos.forEach((filho: any, indice: number) => {
			filho.style.transfrom = `translateX(${
				(indice - indiceAtual) * largura
			})px`;
		});
	}, [indiceAtual]);

	function proximoSlide() {
		setIndiceAtual((indiceAnterior: number) => {
			return indiceAnterior === NUMERO_DE_ITENS - 1 ? 0 : indiceAnterior + 1;
		});
	}

	function slideAnterior() {
		setIndiceAtual((indiceAnterior: number) => {
			return indiceAnterior === 0 ? NUMERO_DE_ITENS - 1 : indiceAnterior - 1;
		});
	}

	return (
		<Wrap className="relative">
			<Container className="relative w-5/6">
				<Wrap>
					<div
						className="relative rounded-lg mb-5"
						ref={carrosselRef}
						onMouseEnter={pararSlide}
						onMouseLeave={iniciarSlide}
					>
						{Children.map(children, (filho: JSX.Element, i) => {
							const propsFilho = filho.props;
							return cloneElement(filho, {
								...propsFilho,
								className: `${i === indiceAtual ? "" : "hidden"}`,
							});
						})}
					</div>
					<Flex className="bottom-5 z-30 gap-2">
						{Array.from({ length: NUMERO_DE_ITENS }).map((_, i) => {
							return (
								<button
									key={i}
									className={mergeClasses("h-3 w-3 rounded-full bg-zinc-800", {
										"bg-zinc-500": i === indiceAtual,
									})}
									onClick={() => setIndiceAtual(i)}
								></button>
							);
						})}
					</Flex>
				</Wrap>
				<Wrap className="absolute h-1 -bottom-0">
					<div
						ref={animacaoRef}
						onAnimationEnd={() => {
							animacaoRef.current!.style.display = "none";
						}}
						className={`rounded-lg h-full 
                            animate-[timer_4.8s_ease-in-out] bg-zinc-800`}
					></div>
				</Wrap>
			</Container>
			<BotaoLateral
				left
				onClick={slideAnterior}
				onMouseEnter={pararSlide}
				onMouseLeave={iniciarSlide}
			>
				<ChevronLeft />
				<span className="hidden">Anterior</span>
			</BotaoLateral>
			<BotaoLateral
				right
				onClick={proximoSlide}
				onMouseEnter={pararSlide}
				onMouseLeave={iniciarSlide}
			>
				<ChevronRight />
				<span className="hidden">Próximo</span>
			</BotaoLateral>
		</Wrap>
	);
}
