"use client";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useState, useEffect } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface CarouselGalleryProps {
  images: string[];
  className?: string;
}

const CarouselGallery = ({ images, className }: CarouselGalleryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [plugin, setPlugin] = useState<any[]>([]);

  useEffect(() => {
    // สร้าง plugin ใน client-side
    if (images.length > 1) {
      // ถ้ามีรูปมากกว่า 1 รูป ให้เริ่ม autoplay
      setPlugin([
        Autoplay({
          delay: 5000,
        }),
      ]);
    }
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <Carousel
      className={cn(
        "mx-auto mb-12 mt-2 w-full max-w-[934px] lg:w-[400px] xl:w-[600px] 2xl:w-[800px]",
        className,
      )}
      plugins={plugin}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative aspect-[16/9] w-full rounded-lg">
              <Image
                fill
                src={image}
                alt={`Slide ${index + 1}`}
                className="size-full object-contain"
                sizes="(max-width: 600px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {images.length > 1 && (
        <>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </>
      )}
    </Carousel>
  );
};

export default CarouselGallery;
