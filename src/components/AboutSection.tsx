import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { GraduationCap, Bot, Wrench, Zap } from "lucide-react";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <motion.div
    className="mb-12 md:mb-16"
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h2 className="text-3xl md:text-5xl font-display font-bold mb-3">
      <span className="gradient-text-full">{title}</span>
    </h2>
    {subtitle && <p className="text-muted-foreground max-w-lg mt-2">{subtitle}</p>}
    <motion.div
      className="h-1 rounded-full mt-4"
      style={{
        background: "var(--gradient-accent)",
        boxShadow: "0 0 10px #9CD5FF40",
      }}
      initial={{ width: 0 }}
      whileInView={{ width: 64 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3, duration: 0.6 }}
    />
  </motion.div>
);

const timeline = [
  { year: "2021", title: "Started B.Tech", desc: "Began studying AI & Data Science" },
  { year: "2022", title: "First ML Project", desc: "Built predictive models with Python" },
  { year: "2023", title: "DevOps & Cloud", desc: "Expanded into CI/CD and cloud deployment" },
  { year: "2024", title: "Advanced AI", desc: "Deep learning, NLP, and production systems" },
];

const infoCards = [
  { label: "Education", value: "B.Tech AI & DS", icon: GraduationCap },
  { label: "Focus", value: "ML & Automation", icon: Bot },
  { label: "Tools", value: "Python, Power BI", icon: Wrench },
  { label: "Passion", value: "Building AI Systems", icon: Zap },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="A glimpse into my journey in AI & Data Science" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div className="space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/80 leading-relaxed"
          >
            I'm{" "}
            <span
              className="font-semibold"
              style={{ color: "#9CD5FF" }}
            >
              Naveen Kumar
            </span>
            , a passionate AI & Data Science Engineer pursuing my B.Tech in Artificial Intelligence
            and Data Science. I specialize in building intelligent systems that transform raw data
            into actionable insights.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/80 leading-relaxed"
          >
            My expertise spans machine learning, data analytics, and DevOps — enabling me to build
            end-to-end solutions from data pipelines to production-ready applications. I believe in
            the power of automation and data-driven decision making.
          </motion.p>

          {/* Info cards */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {infoCards.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.1, type: "spring", stiffness: 180 }}
                  whileHover={{ scale: 1.03, y: -2 }}
                  className="rounded-xl p-4 group relative overflow-hidden"
                  style={{
                    background: "hsl(206 40% 13% / 0.7)",
                    border: "1px solid #35587235",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#7AAACE50";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 18px #9CD5FF15";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "#35587235";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  }}
                >
                  {/* Background accent */}
                  <div
                    className="absolute top-0 right-0 w-16 h-16 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "radial-gradient(circle, #9CD5FF08, transparent)", transform: "translate(30%, -30%)" }}
                  />
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                    style={{ background: "#9CD5FF15", border: "1px solid #9CD5FF25" }}
                  >
                    <Icon size={15} style={{ color: "#9CD5FF" }} strokeWidth={1.8} />
                  </div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1 font-mono">{item.label}</p>
                  <p className="text-sm font-semibold" style={{ color: "#F7F8F0" }}>{item.value}</p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative pl-8 space-y-6">
          {/* Vertical glow line */}
          <motion.div
            className="absolute left-0 top-0 w-px rounded-full"
            style={{ background: "linear-gradient(180deg, #9CD5FF, #7AAACE, #355872)", boxShadow: "0 0 8px #9CD5FF40" }}
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.18, duration: 0.5, type: "spring", stiffness: 150 }}
              className="relative"
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute -left-[calc(2rem+4px)] w-2 h-2 rounded-full"
                style={{ background: "#9CD5FF", boxShadow: "0 0 10px #9CD5FF80", top: "50%", transform: "translateY(-50%)" }}
                animate={inView ? {
                  boxShadow: ["0 0 6px #9CD5FF50", "0 0 18px #9CD5FFaa", "0 0 6px #9CD5FF50"],
                } : {}}
                transition={{ delay: i * 0.18 + 0.5, duration: 2, repeat: Infinity, repeatDelay: 2 }}
              />

              <div
                className="rounded-xl p-4 group"
                style={{
                  background: "hsl(206 40% 13% / 0.65)",
                  border: "1px solid #35587230",
                  backdropFilter: "blur(8px)",
                }}
              >
                {/* Year badge */}
                <span
                  className="inline-block text-[10px] font-mono font-bold px-2 py-0.5 rounded-md mb-2"
                  style={{
                    background: "#9CD5FF15",
                    color: "#9CD5FF",
                    border: "1px solid #9CD5FF30",
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.year}
                </span>
                <h4 className="text-sm font-semibold mb-1" style={{ color: "#F7F8F0" }}>{item.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export { SectionHeading };
export default AboutSection;
