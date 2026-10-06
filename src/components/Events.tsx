import { Navigation } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const locationButtons = [
  {
    label: "Groom's House",
    mapUrl: "https://www.google.com/maps/search/Groom's+House+Addis+Ababa+Ethiopia",
  },
  {
    label: "Bride's House",
    mapUrl: "https://www.google.com/maps/search/Bride's+House+Addis+Ababa+Ethiopia",
  },
  {
    label: "Church",
    mapUrl: "https://www.google.com/maps/search/Holy+Trinity+Cathedral+Addis+Ababa+Ethiopia",
  },
  {
    label: "Hotel",
    mapUrl: "https://www.google.com/maps/search/Capital+Hotel+Spa+Addis+Ababa+Ethiopia",
  },
];

const Events = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: buttonsRef, isVisible: buttonsVisible } = useScrollAnimation(0.2);

  return (
    <section id="events" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-5xl">
        <div
          ref={headerRef}
          className={`text-center mb-10 md:mb-12 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <span className="font-script text-3xl text-secondary">Celebrate With Us</span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mt-2">Locations</h2>
          <div className="w-16 h-px bg-secondary mx-auto mt-4" />
        </div>

        {/* Location buttons: compact on mobile, wrap onto the next line when space runs out */}
        <div
          ref={buttonsRef}
          className={`transition-all duration-700 ${
            buttonsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
            <div className="mt-8 md:mt-10 h-[300px] rounded-sm overflow-hidden shadow-sm border border-border/50 grayscale-[35%]">
          <iframe
            src="https://maps.google.com/maps?q=9.0192,38.7578&z=13&output=embed"
            width="100%"
            height="380"
            style={{ border: 0, marginTop: -80 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wedding Location"
          />
        </div>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {locationButtons.map((loc) => (
              <a
                key={loc.label}
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-sm border border-border bg-card font-body text-[10px] sm:text-xs uppercase tracking-wide sm:tracking-wider whitespace-nowrap text-foreground hover:border-secondary hover:bg-accent/40 transition-all duration-300"
              >
                <Navigation size={10} className="text-secondary sm:w-3 sm:h-3" />
                {loc.label}
              </a>
            ))}
          </div>
        </div>

        {/* Map */}
      
      </div>
    </section>
  );
};

export default Events;