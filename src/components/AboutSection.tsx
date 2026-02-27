import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";

const SectionHeading = ({ title, subtitle }: { title: string; subtitle?: string }) => (
  <div className="mb-12 md:mb-16">
    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">{title}</h2>
    {subtitle && <p className="text-muted-foreground max-w-lg">{subtitle}</p>}
    <div className="w-16 h-1 bg-primary rounded-full mt-4" />
  </div>
);

const timeline = [
  { year: "2021", title: "Started B.Tech", desc: "Began studying AI & Data Science" },
  { year: "2022", title: "First ML Project", desc: "Built predictive models with Python" },
  { year: "2023", title: "DevOps & Cloud", desc: "Expanded into CI/CD and cloud deployment" },
  { year: "2024", title: "Advanced AI", desc: "Deep learning, NLP, and production systems" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <SectionWrapper id="about">
      <SectionHeading title="About Me" subtitle="A glimpse into my journey in AI & Data Science" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Bio */}
        <div className="space-y-5">
          <p className="text-foreground/80 leading-relaxed">
            I'm <span className="font-semibold text-foreground">Naveen Kumar</span>, a passionate 
            AI & Data Science Engineer pursuing my B.Tech in Artificial Intelligence and Data Science. 
            I specialize in building intelligent systems that transform raw data into actionable insights.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            My expertise spans across machine learning, data analytics, and DevOps — enabling me to 
            build end-to-end solutions from data pipelines to production-ready applications. I believe 
            in the power of automation and data-driven decision making.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { label: "Education", value: "B.Tech AI & DS" },
              { label: "Focus", value: "ML & Automation" },
              { label: "Tools", value: "Python, Power BI" },
              { label: "Passion", value: "Building AI Systems" },
            ].map((item) => (
              <div key={item.label} className="glass-card rounded-lg p-4">
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div ref={ref} className="relative pl-8 border-l-2 border-border space-y-8">
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="relative"
            >
              <div className="absolute -left-[calc(2rem+5px)] w-3 h-3 rounded-full bg-primary border-2 border-background" />
              <p className="text-xs font-mono text-primary font-semibold mb-1">{item.year}</p>
              <h4 className="text-sm font-semibold text-foreground mb-1">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export { SectionHeading };
export default AboutSection;
