import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";

const achievements = [
  {
    title: "Hackathon Winner",
    event: "National AI Hackathon 2024",
    desc: "Built an AI-powered healthcare solution in 24 hours",
    icon: "🏆",
  },
  {
    title: "Top 5% on Kaggle",
    event: "Data Science Competition",
    desc: "Ranked among top competitors in tabular data challenge",
    icon: "📊",
  },
  {
    title: "Published Research",
    event: "IEEE Conference 2024",
    desc: "Paper on automated crop disease detection using deep learning",
    icon: "📄",
  },
  {
    title: "Dean's List",
    event: "Academic Excellence",
    desc: "Consistently maintained high academic performance",
    icon: "🎓",
  },
];

const AchievementsSection = () => {
  return (
    <SectionWrapper id="achievements" className="bg-secondary/30">
      <SectionHeading title="Achievements" subtitle="Milestones and recognitions along the way" />

      <div className="grid sm:grid-cols-2 gap-6">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 hover-lift flex gap-4"
          >
            <div className="text-3xl flex-shrink-0">{item.icon}</div>
            <div>
              <h3 className="font-display font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-xs font-mono text-primary mb-2">{item.event}</p>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AchievementsSection;
