import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Link } from "react-router-dom";

const phrases = [
  
  "AI & Data Science Engineer",
  "Turning Data into Decisions",
  "ML • DevOps • Analytics",
];

/* Floating orb with glow */
const GlowOrb = ({
  className,
  style,
  color,
}: {
  className?: string;
  style?: React.CSSProperties;
  color: string;
}) => (
  <div
    className={`floating-blob ${className}`}
    style={{ background: color, ...style }}
  />
);

/* Random particle dots */
const ParticleField = () => {
  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    duration: Math.random() * 8 + 5,
    delay: Math.random() * 6,
    color: ["#9CD5FF", "#7AAACE", "#9CD5FF", "#7AAACE"][
      Math.floor(Math.random() * 4)
    ],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            left: p.left,
            top: p.top,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [0, -80, -160],
            x: [0, Math.random() * 40 - 20, Math.random() * 60 - 30],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1.2, 0.3],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

/* Animated grid lines in background */
const GridLines = () => (
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none"
    style={{
      backgroundImage:
        "linear-gradient(#7AAACE1a 1px, transparent 1px), linear-gradient(90deg, #7AAACE1a 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    }}
  />
);

const HeroSection = () => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /* Parallax mouse effect */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  /* Typewriter */
  useEffect(() => {
    const current = phrases[phraseIndex];
    const speed = isDeleting ? 25 : 55;

    if (!isDeleting && displayed === current) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    }
    if (isDeleting && displayed === "") {
      setIsDeleting(false);
      setPhraseIndex((p) => (p + 1) % phrases.length);
      return;
    }

    const t = setTimeout(() => {
      setDisplayed(
        isDeleting
          ? current.slice(0, displayed.length - 1)
          : current.slice(0, displayed.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [displayed, isDeleting, phraseIndex]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-hero)" }}
    >
      {/* Grid background */}
      <GridLines />

      {/* Particle field */}
      <ParticleField />

      {/* Glowing orbs */}
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none">
        <GlowOrb
          className="w-96 h-96 top-10 -left-28"
          color="#355872"
          style={{ opacity: 0.28 }}
        />
        <GlowOrb
          className="w-80 h-80 bottom-16 -right-24"
          color="#7AAACE"
          style={{ animationDelay: "3s", opacity: 0.22 }}
        />
        <GlowOrb
          className="w-56 h-56 top-1/2 left-1/3"
          color="#9CD5FF"
          style={{ animationDelay: "6s", opacity: 0.18 }}
        />
        <GlowOrb
          className="w-40 h-40 bottom-1/3 left-1/4"
          color="#7AAACE"
          style={{ animationDelay: "2s", opacity: 0.15 }}
        />
      </motion.div>

      {/* Main content — two column layout */}
      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">

        {/* LEFT: Text content */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xs font-mono tracking-[0.3em] uppercase mb-5"
            style={{ color: "#9CD5FF" }}
          >
            ✦ Hello, I'm ✦
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 leading-none"
          >
            <span className="gradient-text-full">Naveen</span>
            <br />
            <span className="text-foreground/90">Kumar</span>
          </motion.h1>

          {/* Glowing separator */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.7 }}
            className="w-24 h-0.5 mb-6 rounded-full md:mx-0 mx-auto"
            style={{ background: "var(--gradient-accent)", boxShadow: "0 0 12px #9CD5FF60" }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="h-10 mb-8"
          >
            <span
              className="text-lg md:text-xl font-body typing-cursor"
              style={{ color: "#7AAACE" }}
            >
              {displayed}
            </span>
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className="flex md:justify-start justify-center mb-8"
          >
            <motion.p
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.4, type: "spring", stiffness: 150 }}
              className="text-sm md:text-base font-display italic px-5 py-2.5 rounded-full cursor-pointer"
              style={{
                color: "#9CD5FF",
                background: "hsl(206 45% 14% / 0.6)",
                boxShadow: "0 0 18px #9CD5FF15",
                letterSpacing: "0.02em",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 28px #9CD5FF40" }}
              whileTap={{ scale: 0.97 }}
            >
              <Link to="/report" className="flex items-center gap-1 no-underline">
                "Learning today, leading tomorrow"
                <span className="ml-2 font-semibold not-italic" style={{ color: "#7AAACE" }}>
                  — NK
                </span>
              </Link>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center md:justify-start justify-center gap-4"
          >
            <motion.a
              href="#projects"
              className="relative px-8 py-3.5 rounded-full text-sm font-semibold text-white overflow-hidden shimmer"
              style={{
                background: "var(--gradient-accent)",
                boxShadow: "0 0 20px #9CD5FF50, 0 4px 15px #7AAACE30",
              }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 35px #9CD5FF70, 0 8px 25px #7AAACE40" }}
              whileTap={{ scale: 0.97 }}
            >
              View Projects 
            </motion.a>
            <motion.a
              href="#contact"
              className="px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300"
              style={{
                border: "1px solid #7AAACE50",
                color: "#F7F8F0",
                background: "hsl(206 37% 18% / 0.4)",
                backdropFilter: "blur(10px)",
              }}
              whileHover={{
                scale: 1.05,
                borderColor: "#9CD5FF",
                boxShadow: "0 0 20px #9CD5FF30",
              }}
              whileTap={{ scale: 0.97 }}
            >
              Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT: Profile photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 flex items-center justify-center"
        >
          <div className="relative">
            <motion.div
              className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden"
              animate={{
                boxShadow: [
                  "0 0 18px #7AAACE35, 0 0 42px #9CD5FF12",
                  "0 0 32px #7AAACE70, 0 0 72px #9CD5FF28",
                  "0 0 18px #7AAACE35, 0 0 42px #9CD5FF12",
                ],
              }}
              transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                border: "3px solid #7AAACE60",
              }}
            >
              <img
                src="/naveen.jpg"
                alt="Naveen Kumar"
                className="w-full h-full object-cover object-top"
                style={{ filter: "contrast(1.05) brightness(1.02)" }}
              />
            </motion.div>
          </div>
        </motion.div>

      </div>

     
    </section>
  );
};

export default HeroSection;

