import { useState } from "react";
import { X } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import g7 from "@/assets/gallery-7.jpg";
import g8 from "@/assets/gallery-8.jpg";

const images = [g1, g2, g3, g4, g5, g6, g7, g8];

const Gallery = () => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  return (
    <section id="gallery" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-script text-3xl text-secondary">Captured Moments</span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">
            Wedding Gallery
          </h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[150px] md:auto-rows-[190px] gap-3">
          {images.map((src, i) => {
            const { ref, isVisible } = useScrollAnimation(0.1);
            return (
              <div
                key={i}
                ref={ref}
                className={`cursor-pointer overflow-hidden rounded-sm group transition-all duration-700 ${
                  i === 0 || i === 5 ? "row-span-2" : "" 
                } ${i === 2 || i === 6 ? "md:col-span-2" : ""} ${
                  isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
                }`}
                onClick={() => setLightbox(i)}
              >
                <img
                  src={src}
                  alt={`Wedding photo ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover grayscale-0 transition-transform duration-1000 group-hover:scale-105"
                  style={{ filter: "none" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-charcoal/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close gallery"
            className="absolute top-6 right-6 text-background hover:text-secondary transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={32} />
          </button>
          <img
            src={images[lightbox]}
            alt="Gallery full"
            className="max-w-full max-h-[85vh] object-contain grayscale-0 shadow-2xl"
            style={{ filter: "none" }}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;