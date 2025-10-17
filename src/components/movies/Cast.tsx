"use client";

import React, { useState, useRef } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import Container from "../template/Container";
import Title from "../template/Title";
import Flex from "../template/Flex";
import ImageWithFallback from "../template/ImageWithFallback";
import { User } from "lucide-react";
import Link from "next/link";

interface CastProps {
    cast: Actor[];
}

export default function Cast({ cast }: CastProps) {
  const [selectedIndice, setSelectedIndice] = useState<number | null>(null);

  const springConfig = { stiffness: 100, damping: 15 };
  const x = useMotionValue(0);
  const animationFrameRef = useRef<number | null>(null);

  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig,
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig,
  );

  const handleMouseMove = (event: any) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const halfWidth = event.target.offsetWidth / 2;
      x.set(event.nativeEvent.offsetX - halfWidth);
    });
  };

  return (
    <Container className="pb-0 pt-10">
        <Title text="Cast" className="mb-4" align="center" />
        <Flex className="flex-wrap mt-16">
            {cast.map((actor, i) => (
                <Link href={`/actor/${actor.id}`} key={actor.id}>
                  <div
                  className="group relative -mr-4"
                  onMouseEnter={() => setSelectedIndice(i)}
                  onMouseLeave={() => setSelectedIndice(null)}
                  >
                  <AnimatePresence>
                      {selectedIndice === i && (
                      <motion.div
                          initial={{ opacity: 0, y: 20, scale: 0.6 }}
                          animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          transition: {
                              type: "spring",
                              stiffness: 260,
                              damping: 10,
                          },
                          }}
                          exit={{ opacity: 0, y: 20, scale: 0.6 }}
                          style={{
                          translateX: translateX,
                          rotate: rotate,
                          whiteSpace: "nowrap",
                          }}
                          className="absolute -top-16 -left-1/4 z-50 flex -translate-x-1/2 flex-col items-center justify-center rounded-md bg-black px-4 py-2 text-xs shadow-xl"
                      >
                          <div className="absolute inset-x-10 -bottom-px z-30 h-px w-[20%] bg-gradient-to-r from-transparent via-emerald-500 to-transparent" />
                          <div className="absolute -bottom-px left-10 z-30 h-px w-[40%] bg-gradient-to-r from-transparent via-sky-500 to-transparent" />
                          <div className="relative z-30 text-base font-bold text-white">
                          {actor.character}
                          </div>
                          <div className="text-xs text-white">{actor.name}</div>
                      </motion.div>
                      )}
                  </AnimatePresence>
                  <div className={`h-24 w-24 rounded-full 
                      border-2 border-white relative transition duration-500 
                      group-hover:scale-105 group-hover:z-30`}>
                      <ImageWithFallback 
                          url={actor.profileImage} 
                          imgAlt={`Photo of ${actor.name}`}
                          className="rounded-full"
                      >
                          <Flex className="bg-black">
                              <User className="w-10 h-10 text-gray-200" />
                          </Flex>
                      </ImageWithFallback>
                  </div>
                  </div>
                </Link>
            ))}
        </Flex>
    </Container>
  );
};
