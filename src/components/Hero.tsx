import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import heroBg from "@/assets/hero-couple.jpg";

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
    const weddingDate = new Date("2026-09-15T10:00:00").getTime();
    const tick = () => {
      const now = Date.now();
      const diff = weddingDate - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="relative min-h-[92svh] flex items-center justify-center overflow-hidden bg-primary">
      <img
        src={heroBg}
        alt="Rediet and Partner"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover grayscale contrast-110"
      />
      <div className="hero-overlay absolute inset-0" />

      <div
        className={`relative z-10 text-center px-4 max-w-3xl mx-auto transition-all duration-1000 ${
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <Heart
          aria-hidden="true"
          size={16}
          strokeWidth={1}
          className="mx-auto mb-4 sm:mb-5 sm:w-5 sm:h-5 text-background/80"
        />
        <p className="text-background/90 text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-body mb-5 sm:mb-7">
          Save the date
        </p>
        <h1 className="font-heading font-normal italic text-3xl min-[400px]:text-4xl sm:text-7xl md:text-8xl uppercase tracking-wide leading-tight text-background mb-4 sm:mb-5">
          Rediet & Partner
        </h1>
        <div className="w-12 sm:w-16 h-px bg-background/60 mx-auto my-5 sm:my-7" />
        <p className="text-background/90 font-body text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-1.5 sm:mb-2">
          September 15, 2026
        </p>
        <p className="text-background/70 font-body text-xs sm:text-sm tracking-[0.1em] sm:tracking-[0.15em]">
          Addis Ababa, Ethiopia
        </p>

        {/* Countdown */}
        <div className="grid grid-cols-4 gap-2 sm:gap-6 mt-8 sm:mt-10 max-w-xs sm:max-w-none mx-auto">
          {[
            { val: timeLeft.days, label: "Days" },
            { val: timeLeft.hours, label: "Hours" },
            { val: timeLeft.minutes, label: "Minutes" },
            { val: timeLeft.seconds, label: "Seconds" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-full aspect-square max-w-[64px] mx-auto sm:max-w-none sm:w-20 sm:h-20 sm:aspect-auto border border-background/35 flex items-center justify-center bg-charcoal/30 backdrop-blur-sm">
                <span className="font-heading text-xl sm:text-3xl text-background">
                  {String(item.val).padStart(2, "0")}
                </span>
              </div>
              <span className="text-background/80 text-[9px] sm:text-[10px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-body mt-1.5 sm:mt-2 block">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        <a
          href="#rsvp"
          className="inline-block mt-8 sm:mt-12 border border-background/70 text-background px-6 py-2.5 sm:px-8 sm:py-3 rounded-sm font-body text-[11px] sm:text-xs uppercase tracking-widest transition-colors duration-300 hover:bg-background hover:text-primary"
        >
          View Invitation
        </a>
      </div>
    </section>
  );
};

export default Hero;