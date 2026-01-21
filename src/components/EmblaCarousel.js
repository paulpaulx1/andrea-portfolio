"use client";

import React, { useRef, useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import styles from "./EmblaCarousel.module.css";

export default function EmblaCarousel({ images, autoplayDelay = 5000 }) {
  const autoplay = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplay.current,
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  const handleClick = (e) => {
    if (!emblaApi) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    x > rect.width / 2 ? emblaApi.scrollNext() : emblaApi.scrollPrev();
  };

  if (!images?.length) return null;

  return (
    <div className={styles.embla}>
      <div
        className={styles.embla__viewport}
        ref={emblaRef}
        onClick={handleClick}
      >
        <div className={styles.embla__container}>
          {images.map((img, i) => (
            <div key={img._key || i} className={styles.embla__slide}>
              <Image
                src={img.url}
                alt={img.alt || `Slide ${i + 1}`}
                fill
                priority={i === 0}
                sizes="(max-width:768px)100vw,(max-width:1200px)800px,800px"
              />
            </div>
          ))}
        </div>
      </div>

      <div className={styles.dots}>
        {images.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === selectedIndex ? styles.dotActive : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              emblaApi && emblaApi.scrollTo(i);
            }}
          />
        ))}
      </div>
    </div>
  );
}
