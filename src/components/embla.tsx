"use client";

import React, { useState, useEffect, ReactNode } from "react";
import useEmblaCarousel from "embla-carousel-react";

interface EmblaSlideProps {
  className?: string; // optional 속성으로 변경
  onClick?: () => void;
  children: ReactNode;
}

interface EmblaContainerProps {
  children: ReactNode;
}

interface EmblaProps {
  children: ReactNode;
}

export function EmblaSlide({
  className = "",
  onClick,
  children,
}: EmblaSlideProps) {
  return (
    <li onClick={onClick} className={`embla__slide px-2 py-4 ${className}`}>
      {children}
    </li>
  );
}

export function EmblaContainer({ children }: EmblaContainerProps) {
  return <ul className="embla__container flex flex-row">{children}</ul>;
}

export function Embla({ children }: EmblaProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  return (
    <>
      <div className="embla" ref={emblaRef}>
        {children}
      </div>
    </>
  );
}
