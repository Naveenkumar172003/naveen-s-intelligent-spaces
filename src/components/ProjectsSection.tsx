import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const projects = [
  {
    title: "QR Attendance System",
    description: "Flask web app that marks attendance by scanning QR codes via webcam and exports records to Excel.",
    longDesc:
      "A simple Flask-based web application that marks attendance by scanning QR codes using a webcam. Stores attendance data in an SQLite database and supports exporting records to Excel for easy reporting and tracking.",
    tags: ["Python", "Flask", "SQLite", "OpenCV", "Excel"],
    num: "01",
    image: "https://images.unsplash.com/photo-1595079676601-f1adf5be5dee?w=600&q=80",
    gradient: "linear-gradient(135deg, hsl(206 45% 12%), hsl(206 50% 16%))",
    accentColor: "#9CD5FF",
    tagBg: "hsl(206 50% 15%)",
    github: "https://github.com/Naveenkumar172003/QR-Attendance-sytem.git",
  },
  {
    title: "Hall Management System",
    description: "College hall booking and management system for scheduling and tracking room allocations.",
    longDesc:
      "A comprehensive hall management solution built for college administration. Handles scheduling, room allocation tracking, and booking management to streamline event and class coordination across campus facilities.",
    tags: ["Flutter", "Dart", "Firebase", "SQLite"],
    num: "02",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80",
    gradient: "linear-gradient(135deg, hsl(206 46% 13%), hsl(206 37% 10%))",
    accentColor: "#7AAACE",
    tagBg: "hsl(206 45% 14%)",
    github: "https://github.com/Naveenkumar172003/hall.git",
  },
  {
    title: "Data Analytics Dashboard",
    description: "Interactive dashboard that transforms raw data into rich, actionable visualizations.",
    longDesc:
      "Transforms raw datasets into insightful visual stories through an interactive analytics dashboard. Features dynamic charts, KPI metrics, filtering, and drill-down capabilities to help stakeholders make data-driven decisions.",
    tags: ["Python", "Power BI", "SQL", "Data Viz"],
    num: "03",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    gradient: "linear-gradient(135deg, hsl(206 50% 11%), hsl(206 45% 14%))",
    accentColor: "#9CD5FF",
    tagBg: "hsl(206 50% 13%)",
    github: "https://github.com/Naveenkumar172003/Dashboard.git",
  },
];

const ProjectsSection = () => {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Projects" subtitle="Selected work showcasing my technical abilities" />

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 120 }}
            onClick={() => setSelected(project)}
            className="group cursor-pointer rounded-2xl overflow-hidden relative"
            whileHover={{ scale: 1.02 }}
            style={{
              background: "hsl(206 45% 11%)",
              border: `1px solid ${project.accentColor}20`,
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${project.accentColor}70`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 30px ${project.accentColor}20`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.borderColor = `${project.accentColor}20`;
              (e.currentTarget as HTMLDivElement).style.boxShadow = "";
            }}
          >
            {/* Image header */}
            <div
              className="h-44 relative overflow-hidden"
              style={{ background: project.gradient }}
            >
              {/* Actual project image */}
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ opacity: 0.55 }}
              />
              {/* Gradient overlay */}
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(to top, hsl(206 45% 11%) 0%, ${project.accentColor}10 60%, transparent 100%)` }}
              />
              {/* Animated orb in bg */}
              <motion.div
                className="absolute w-32 h-32 rounded-full blur-2xl"
                style={{ background: project.accentColor, opacity: 0.12 }}
                animate={{ scale: [1, 1.2, 1], x: [0, 20, 0], y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Number badge */}
              <span
                className="absolute bottom-3 left-4 text-4xl font-display font-black"
                style={{ color: project.accentColor, opacity: 0.35, textShadow: `0 0 20px ${project.accentColor}` }}
              >
                {project.num}
              </span>
              {/* Arrow indicator */}
              <motion.div
                className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: `${project.accentColor}30`, border: `1px solid ${project.accentColor}60`, backdropFilter: "blur(8px)" }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
              >
                <span style={{ color: project.accentColor, fontSize: 12 }}>↗</span>
              </motion.div>
            </div>

            <div className="p-6">
              <h3
                className="font-display text-lg font-semibold mb-2 transition-colors duration-300"
                style={{ color: "#F7F8F0" }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 rounded-full"
                    style={{ background: project.tagBg, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
        <DialogContent
          className="max-w-lg rounded-2xl"
          style={{
          background: "hsl(206 45% 10%)",
          border: `1px solid ${selected?.accentColor ?? "#355872"}40`,
          boxShadow: `0 20px 60px #35587250`,
          }}
        >
          <DialogHeader>
            <DialogTitle
              className="font-display text-xl"
              style={{ color: selected?.accentColor }}
            >
              {selected?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2 leading-relaxed">
              {selected?.longDesc}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {selected?.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-full"
                style={{
                  background: selected.tagBg,
                  color: selected.accentColor,
                  border: `1px solid ${selected.accentColor}30`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <motion.a
              href={selected?.github}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-2.5 rounded-full text-sm font-semibold"
              style={{
              border: "1px solid #35587240",
              color: "#F7F8F0",
              background: "hsl(206 40% 16% / 0.5)",
              }}
            >
              View on GitHub ↗
            </motion.a>
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default ProjectsSection;
