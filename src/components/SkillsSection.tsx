import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";

const skillCategories = [
  {
    title: "Programming",
    icon: "🧠",
    color: "#9CD5FF",
    skills: [
      { name: "Python", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "JavaScript", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "SQL", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    ],
  },
  {
    title: "Data & AI",
    icon: "📊",
    color: "#7AAACE",
    skills: [
      { name: "TensorFlow", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
      { name: "Pandas", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
      { name: "NumPy", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
      { name: "Scikit-learn", img: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
      { name: "Power BI", img: "https://img.icons8.com/color/96/power-bi.png" },
    ],
  },
  {
    title: "DevOps & Tools",
    icon: "⚙️",
    color: "#9CD5FF",
    skills: [
      { name: "Docker", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
      { name: "Git", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
      { name: "Linux", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "VS Code", img: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" },
    ],
  },
];

const floatVariants = (i: number) => ({
  y: [0, -6, 0],
  transition: {
    duration: 3 + (i % 3) * 0.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
    delay: i * 0.18,
  },
});

const SkillsSection = () => {
  return (
    <SectionWrapper id="skills" className="bg-secondary/10">
      <SectionHeading title="Skills" subtitle="Technologies and tools I work with" />

      <div className="space-y-10">
        {skillCategories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.15, type: "spring", stiffness: 110 }}
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
                style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}35` }}
              >
                {cat.icon}
              </div>
              <h3
                className="font-display text-lg font-semibold tracking-wide"
                style={{ color: cat.color }}
              >
                {cat.title}
              </h3>
              <div className="flex-1 h-px" style={{ background: `linear-gradient(90deg, ${cat.color}40, transparent)` }} />
            </div>

            {/* Skill icon grid */}
            <div className="flex flex-wrap gap-5">
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: ci * 0.12 + si * 0.08, type: "spring", stiffness: 180 }}
                  whileHover={{
                    scale: 1.15,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  className="flex flex-col items-center gap-2 cursor-default group"
                  style={{ width: 76 }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative overflow-hidden"
                    animate={floatVariants(ci * 5 + si)}
                    style={{
                      background: "hsl(206 40% 14% / 0.7)",
                      border: `1px solid ${cat.color}25`,
                      transition: "box-shadow 0.3s, border-color 0.3s",
                    }}
                    whileHover={{
                      boxShadow: `0 0 22px ${cat.color}60`,
                      borderColor: `${cat.color}80`,
                    }}
                  >
                    {/* Subtle inner glow on hover */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ background: `radial-gradient(circle at center, ${cat.color}15, transparent 70%)` }}
                    />
                    <img
                      src={skill.img}
                      alt={skill.name}
                      className="w-9 h-9 object-contain relative z-10"
                      loading="lazy"
                      style={{
                        filter: skill.name === "GitHub" ? "invert(1) brightness(0.85)" : undefined,
                      }}
                    />
                  </motion.div>
                  <span
                    className="text-xs font-medium text-center leading-tight transition-colors duration-200"
                    style={{ color: "#F7F8F0", opacity: 0.75 }}
                  >
                    {skill.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
