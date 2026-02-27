import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";

const skillCategories = [
  {
    title: "Programming",
    skills: [
      { name: "Python", level: 90 },
      { name: "SQL", level: 80 },
      { name: "JavaScript", level: 70 },
    ],
  },
  {
    title: "Data & Analytics",
    skills: [
      { name: "Power BI", level: 85 },
      { name: "Pandas / NumPy", level: 88 },
      { name: "Machine Learning", level: 82 },
    ],
  },
  {
    title: "DevOps & Tools",
    skills: [
      { name: "Docker", level: 75 },
      { name: "Git & CI/CD", level: 80 },
      { name: "Linux", level: 72 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted-foreground font-mono text-xs">{level}%</span>
      </div>
      <div className="h-2 bg-secondary rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-accent)" }}
        />
      </div>
    </div>
  );
};

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="bg-secondary/30">
      <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

      <div className="grid md:grid-cols-3 gap-8">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.1 }}
            className="glass-card rounded-xl p-6 hover-lift"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">{cat.title}</h3>
            <div className="space-y-5">
              {cat.skills.map((skill, si) => (
                <SkillBar key={skill.name} name={skill.name} level={skill.level} delay={ci * 0.1 + si * 0.1} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
