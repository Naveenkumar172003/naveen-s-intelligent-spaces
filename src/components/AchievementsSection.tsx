import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";
import { Trophy, MonitorPlay, Code2, BarChart3 } from "lucide-react";

const achievements = [
  {
    title: "Hackathon Participant",
    event: "Erode Senkunthar College Hackathon",
    desc: "Competed in a college-level hackathon, building an innovative tech solution under time pressure.",
    icon: Trophy,
    color: "#9CD5FF",
    bg: "hsl(206 45% 11%)",
    border: "#35587255",
  },
  {
    title: "Power BI Bootcamp",
    event: "Online Power BI Bootcamp — 1 Day",
    desc: "Completed an intensive one-day online bootcamp focused on Power BI dashboards and data modeling.",
    icon: MonitorPlay,
    color: "#7AAACE",
    bg: "hsl(206 40% 12%)",
    border: "#7AAACE40",
  },
  {
    title: "36-Hour Hackathon",
    event: "NSCET College Hackathon",
    desc: "Participated in a 36-hour non-stop college hackathon, delivering a fully functional project.",
    icon: Code2,
    color: "#9CD5FF",
    bg: "hsl(206 45% 11%)",
    border: "#35587255",
  },
  {
    title: "Data Visualization Certificate",
    event: "TATA — Data Visualization Program",
    desc: "Earned a certification in data visualization and storytelling through the TATA professional program.",
    icon: BarChart3,
    color: "#7AAACE",
    bg: "hsl(206 40% 12%)",
    border: "#7AAACE40",
  },
];

const AchievementsSection = () => {
  return (
    <SectionWrapper id="achievements" className="bg-secondary/10">
      <SectionHeading title="Achievements" subtitle="Milestones and recognitions along the way" />

      <div className="grid sm:grid-cols-2 gap-6">
        {achievements.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 150 }}
            whileHover={{ scale: 1.03 }}
            className="rounded-2xl p-6 flex gap-5 relative overflow-hidden shimmer cursor-default"
            style={{
              background: item.bg,
              border: `1px solid ${item.border}`,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 25px ${item.color}30`;
              (e.currentTarget as HTMLDivElement).style.borderColor = item.color + "70";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
              (e.currentTarget as HTMLDivElement).style.borderColor = item.border;
            }}
          >
            {/* Background glow blob */}
            <div
              className="absolute -top-6 -right-6 w-20 h-20 rounded-full blur-2xl opacity-20"
              style={{ background: item.color }}
            />

            {/* Icon badge */}
            <motion.div
              className="flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: `${item.color}18`,
                border: `1px solid ${item.color}35`,
                boxShadow: `0 0 12px ${item.color}25`,
              }}
              animate={{
                boxShadow: [
                  `0 0 8px ${item.color}25`,
                  `0 0 20px ${item.color}50`,
                  `0 0 8px ${item.color}25`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            >
              <item.icon size={22} style={{ color: item.color }} strokeWidth={1.8} />
            </motion.div>

            <div>
              <h3 className="font-display font-bold mb-1" style={{ color: "hsl(240 12% 95%)" }}>
                {item.title}
              </h3>
              <p className="text-xs font-mono font-semibold mb-2" style={{ color: item.color }}>
                {item.event}
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AchievementsSection;
