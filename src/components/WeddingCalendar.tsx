import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Heart } from "lucide-react";
import heroImg from "@/assets/hero-couple.jpg";

const WeddingCalendar = () => {
  const { ref, isVisible } = useScrollAnimation();

  const weddingDate = new Date(2026, 4, 3); // May 3, 2026
  const month = weddingDate.toLocaleString("default", { month: "long" });
  const year = weddingDate.getFullYear();
  const weddingDay = weddingDate.getDate();

  // Build calendar grid
  const firstDay = new Date(year, weddingDate.getMonth(), 1).getDay();
  const daysInMonth = new Date(year, weddingDate.getMonth() + 1, 0).getDate();
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImg})` }}
      />
      <div className="absolute inset-0 bg-charcoal/65" />

      <div className="relative container mx-auto max-w-md px-4">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="bg-card/95 rounded-sm shadow-2xl p-6 md:p-9 border border-background/60">
            <h3 className="font-heading text-2xl text-center text-foreground mb-1">
              {month} {year}
            </h3>
            <p className="font-heading italic text-xl text-secondary text-center mb-6">Save the Date</p>

            <div className="grid grid-cols-7 gap-1 text-center">
              {dayNames.map((d) => (
                <span key={d} className="font-body text-xs text-muted-foreground font-medium py-1">
                  {d}
                </span>
              ))}
              {cells.map((day, i) => (
                <div
                  key={i}
                  className={`relative flex items-center justify-center h-9 w-9 mx-auto rounded-full text-sm font-body transition-all duration-300 ${
                    day === weddingDay
                      ? "gold-gradient text-primary-foreground font-bold scale-110 shadow-lg"
                      : day
                      ? "text-foreground hover:bg-muted"
                      : ""
                  }`}
                >
                  {day || ""}
                  {day === weddingDay && (
                    <Heart
                      size={10}
                      className="absolute -top-1 -right-1 text-primary fill-primary animate-pulse"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingCalendar;
