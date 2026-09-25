import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BriefcaseBusiness, Bug, Clock3, Code2, Database, Download, HardDrive, Server, ShieldCheck, Terminal, Wifi, Wrench } from "lucide-react";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";

const IdentitySection = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [activeSupportIcon, setActiveSupportIcon] = useState(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 180, damping: 22 });
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);
  const leftRopePath = useTransform([dragX, dragY], ([x, y]) => `M 10 0 C 18 90, 27 220, ${40 + x} ${304 + y}`);
  const rightRopePath = useTransform([dragX, dragY], ([x, y]) => `M 70 0 C 62 90, 53 220, ${40 + x} ${304 + y}`);
  const clipX = useTransform(dragX, (x) => 40 + x);
  const clipY = useTransform(dragY, (y) => 304 + y);
  const mobileLeftRopePath = useTransform([dragX, dragY], ([x, y]) => `M 10 0 C 18 14, 27 34, ${40 + x} ${48 + y}`);
  const mobileRightRopePath = useTransform([dragX, dragY], ([x, y]) => `M 70 0 C 62 14, 53 34, ${40 + x} ${48 + y}`);
  const mobileClipY = useTransform(dragY, (y) => 48 + y);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    rotateY.set(x * 14);
    rotateX.set(y * -14);
  };

  const resetTilt = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleDragEnd = () => {
    setIsShaking(true);
    window.setTimeout(() => setIsShaking(false), 450);
  };

  useEffect(() => {
    const iconTimer = window.setInterval(() => {
      setActiveSupportIcon((current) => (current + 1) % 23);
    }, 1400);

    return () => window.clearInterval(iconTimer);
  }, []);

  return (
    <SectionWrapper id="experience" className="relative overflow-hidden bg-[hsl(206_42%_13%)]">
      <SectionHeading title="EXPERIENCE" subtitle="Every experience, good or bad, teaches us something." />

      <div className="grid lg:grid-cols-[0.8fr_1.2fr] items-center gap-12 lg:gap-20 max-w-5xl mx-auto">
      <div className="absolute inset-0 block pointer-events-none" aria-hidden="true">
        {[
          { icon: Terminal, label: "support.log", className: "top-28 left-[7%]", delay: 0 },
          { icon: Database, label: "DB online", className: "top-52 right-[8%]", delay: 1.2 },
          { icon: Server, label: "system stable", className: "bottom-24 left-[11%]", delay: 2.1 },
          { icon: Wrench, label: "issue resolved", className: "bottom-32 right-[12%]", delay: 0.7 },
          { icon: Wifi, label: "network ready", className: "top-[38%] left-[4%]", delay: 1.8 },
          { icon: HardDrive, label: "storage check", className: "top-[30%] right-[5%]", delay: 2.7 },
          { icon: ShieldCheck, label: "access verified", className: "bottom-[18%] right-[28%]", delay: 1.5 },
          { icon: Bug, label: "ticket tracked", className: "bottom-[14%] left-[29%]", delay: 3.2 },
          { icon: Terminal, label: "shell ready", className: "top-[18%] left-[22%]", delay: 0.4 },
          { icon: Database, label: "query healthy", className: "top-[22%] right-[24%]", delay: 2.4 },
          { icon: Server, label: "uptime 99.9%", className: "top-[46%] left-[17%]", delay: 1.1 },
          { icon: Wrench, label: "service restored", className: "top-[52%] right-[16%]", delay: 3.5 },
          { icon: Wifi, label: "ping stable", className: "top-[64%] left-[5%]", delay: 2.2 },
          { icon: HardDrive, label: "backup complete", className: "top-[68%] right-[7%]", delay: 0.9 },
          { icon: ShieldCheck, label: "permission ok", className: "top-[12%] right-[38%]", delay: 1.9 },
          { icon: Bug, label: "incident closed", className: "top-[72%] left-[39%]", delay: 2.8 },
          { icon: Terminal, label: "linux active", className: "bottom-[30%] left-[4%]", delay: 3.8 },
          { icon: Database, label: "db connected", className: "bottom-[26%] right-[4%]", delay: 1.7 },
          { icon: Server, label: "cache synced", className: "top-[34%] left-[31%]", delay: 2.6 },
          { icon: Wrench, label: "patch applied", className: "top-[40%] right-[32%]", delay: 0.6 },
          { icon: Wifi, label: "vpn connected", className: "bottom-[10%] right-[39%]", delay: 3.1 },
          { icon: HardDrive, label: "disk monitored", className: "bottom-[38%] left-[23%]", delay: 1.3 },
          { icon: ShieldCheck, label: "secure session", className: "bottom-[42%] right-[22%]", delay: 2.9 },
        ].map(({ icon: Icon, label, className, delay }, index) => {
          const travelX = 24 + (index % 4) * 12;
          const travelY = 18 + (index % 3) * 14;
          const direction = index % 2 ? -1 : 1;
          const iconColor = Icon === Database
            ? "#F2C879"
            : Icon === Server
              ? "#9CD5FF"
              : Icon === Wifi
                ? "#5EEAD4"
                : Icon === ShieldCheck
                  ? "#A78BFA"
                  : Icon === Bug
                    ? "#FB7185"
                    : Icon === Wrench
                      ? "#F59E0B"
                      : Icon === HardDrive
                        ? "#60A5FA"
                        : "#8FD3C7";
          const isVisible = Math.floor(index / 4) === Math.floor(activeSupportIcon / 4);

          return (
            <motion.div
              key={label}
              aria-label={label}
              title={label}
              className={`absolute ${className} flex h-8 w-8 scale-75 items-center justify-center rounded-xl md:h-9 md:w-9 md:scale-100`}
              style={{ color: iconColor, background: "#102331d9", border: `1px solid ${iconColor}55`, boxShadow: `0 0 18px ${iconColor}25` }}
              animate={{
                opacity: isVisible ? [0, 1, 1, 0] : 0,
                x: [0, direction * travelX, direction * -travelX * 0.7, direction * travelX * 0.35, 0],
                y: [0, -travelY, travelY * 0.8, -travelY * 0.45, 0],
                rotate: [0, direction * 3, direction * -2, direction * 1, 0],
                scale: [1, 1.06, 0.98, 1.04, 1],
              }}
              transition={{ duration: 1.35, delay: index === activeSupportIcon ? 0 : 0.15, repeat: 0, ease: "easeInOut" }}
            >
              <Icon size={13} style={{ color: iconColor }} />
            </motion.div>
          );
        })}
      </div>
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-sm"
        >
          <p className="text-sm uppercase tracking-[0.28em] font-mono mb-4" style={{ color: "#9CD5FF" }}>
            Professional Experience
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-5">
            Technical Support Engineer at Promon.
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            I work at Promon Software Solutions in Chennai, supporting users, troubleshooting application issues, and helping maintain reliable technical operations across operating systems, databases, and Linux environments.
          </p>
          <div className="flex flex-wrap gap-3 mt-7">
            {["OS Operations", "Database Support", "Linux", "Troubleshooting"].map((label) => (
              <span
                key={label}
                className="text-xs font-mono px-3 py-2 rounded-full"
                style={{ background: "#9CD5FF12", color: "#9CD5FF", border: "1px solid #9CD5FF28" }}
              >
                {label}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="relative mt-56 flex justify-center pt-16 pb-8 [perspective:1400px] lg:mt-0">
          <motion.div
            className="absolute w-64 h-64 rounded-full blur-3xl opacity-20"
            style={{ background: "#7AAACE", top: "50%", left: "50%", translateX: "-50%", translateY: "-50%" }}
            animate={{ scale: [0.9, 1.15, 0.9], opacity: [0.12, 0.24, 0.12] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.svg
            className="absolute left-1/2 -top-64 z-0 hidden h-[360px] w-20 -translate-x-1/2 overflow-visible sm:block"
            viewBox="0 0 80 360"
            aria-hidden="true"
          >
            <motion.path d={leftRopePath} fill="none" stroke="#061321" strokeWidth="17" strokeLinecap="round" />
            <motion.path d={leftRopePath} fill="none" stroke="#263b4a" strokeWidth="9" strokeLinecap="round" />
            <motion.path d={leftRopePath} fill="none" stroke="#7d919c" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 5" opacity="0.75" />
            <motion.path d={rightRopePath} fill="none" stroke="#061321" strokeWidth="17" strokeLinecap="round" />
            <motion.path d={rightRopePath} fill="none" stroke="#263b4a" strokeWidth="9" strokeLinecap="round" />
            <motion.path d={rightRopePath} fill="none" stroke="#7d919c" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 5" opacity="0.75" />
            <motion.circle cx={clipX} cy={clipY} r="11" fill="#65757e" stroke="#e1e8e9" strokeWidth="4" />
            <motion.rect x={clipX} y={clipY} width="16" height="10" rx="3" transform="translate(-8, 7)" fill="#405762" stroke="#aebcc1" strokeWidth="1" />
          </motion.svg>

          <motion.svg
            className="absolute left-1/2 top-0 z-0 block h-[120px] w-20 -translate-x-1/2 overflow-visible sm:hidden"
            viewBox="0 0 80 120"
            aria-hidden="true"
          >
            <motion.path d={mobileLeftRopePath} fill="none" stroke="#061321" strokeWidth="17" strokeLinecap="round" />
            <motion.path d={mobileLeftRopePath} fill="none" stroke="#263b4a" strokeWidth="9" strokeLinecap="round" />
            <motion.path d={mobileRightRopePath} fill="none" stroke="#061321" strokeWidth="17" strokeLinecap="round" />
            <motion.path d={mobileRightRopePath} fill="none" stroke="#263b4a" strokeWidth="9" strokeLinecap="round" />
            <motion.circle cx={clipX} cy={mobileClipY} r="11" fill="#65757e" stroke="#e1e8e9" strokeWidth="4" />
          </motion.svg>

          <motion.div
            className="relative z-10 w-full max-w-[260px] sm:max-w-[300px] cursor-grab active:cursor-grabbing"
            style={{ rotateX, rotateY, x: dragX, y: dragY, transformStyle: "preserve-3d" }}
            initial={{ opacity: 0, y: -160, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0 }}
            viewport={{ amount: 0.35 }}
            transition={{ duration: 1, type: "spring", stiffness: 90, damping: 14 }}
            drag
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragElastic={0.72}
            dragMomentum={false}
            whileDrag={{ scale: 1.04, opacity: 0.42, zIndex: 20 }}
            onDragEnd={handleDragEnd}
            onPointerMove={handlePointerMove}
            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={resetTilt}
          >
            <motion.div
              className="relative overflow-hidden rounded-[1.35rem]"
              animate={isShaking
                ? { x: [0, -1, 1, 0], rotateZ: [0, -0.2, 0.2, 0] }
                : { rotateZ: [-0.8, 0.8, -0.8], scale: [1, 1.012, 1] }}
              transition={isShaking
                ? { duration: 0.25, ease: "easeOut" }
                : { duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "#f7f8f0",
                color: "#162331",
                boxShadow: "0 28px 60px #07131f80, inset 0 1px 0 #ffffffcc",
                border: "1px solid #ffffff80",
                aspectRatio: "0.74 / 1",
              }}
            >
              <div className="relative h-[64%] min-h-[200px] sm:min-h-[260px] overflow-hidden">
                <img src="/naveen.jpg" alt="Naveen Kumar" className="h-full w-full object-cover object-top" style={{ filter: "contrast(1.08) brightness(1.02)" }} />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 68%, #f7f8f0 100%)" }} />
                <motion.div
                  className="absolute inset-y-0 -left-1/2 w-1/3 skew-x-[-20deg]"
                  style={{ background: "linear-gradient(90deg, transparent, #ffffffa8, transparent)" }}
                  animate={{ x: [0, 620] }}
                  transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
                />
                <div className="absolute bottom-3 left-4">
                  <p className="font-display text-xl font-black tracking-tight">Naveen Kumar S</p>
                  <p className="flex items-center gap-1.5 text-[11px] font-semibold" style={{ color: "#355872" }}><BriefcaseBusiness size={12} /> Technical Support Engineer</p>
                </div>
              </div>

              <div className="relative z-10 flex h-[36%] flex-col px-4 pb-4 pt-2">
                <div className="mb-2 h-1 w-8 rounded-full" style={{ background: "#355872" }} />
                <div className="border-b border-[#35587225] pb-3">
                  <p className="text-[10px] font-semibold text-[#355872]">Technical Support Engineer</p>
                  <p className="mt-1 text-[10px] font-medium text-[#51616b]">Promon Software Solutions</p>
                  <p className="mt-1 text-[9px] text-[#687780]">May 2026 - Present · Chennai</p>
                </div>

                <div className="flex gap-2 mt-2">
                  <a href="#contact" className="flex flex-1 items-center justify-center gap-1 rounded-full py-1.5 text-[9px] font-semibold text-white" style={{ background: "#162331" }}>Get in Touch <ArrowRight size={10} /></a>
                  <a href="/Naveen kumar.pdf" download="Naveen_Kumar_Resume.pdf" className="flex flex-1 items-center justify-center gap-1 rounded-full border border-[#35587235] py-1.5 text-[9px] font-semibold" style={{ color: "#162331" }}>Download CV <Download size={10} /></a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default IdentitySection;