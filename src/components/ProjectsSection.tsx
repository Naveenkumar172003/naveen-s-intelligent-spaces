import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const projects = [
  {
    title: "AI Crop Disease Detector",
    description: "Deep learning model to identify plant diseases from leaf images with 95%+ accuracy.",
    longDesc: "Built a CNN-based image classification system trained on 50,000+ leaf images to detect 38 types of crop diseases. Deployed with Flask API and integrated with a mobile-friendly frontend.",
    tags: ["Python", "TensorFlow", "Flask", "OpenCV"],
    color: "from-primary/20 to-accent/10",
  },
  {
    title: "Sales Analytics Dashboard",
    description: "Interactive Power BI dashboard for real-time sales insights and trend forecasting.",
    longDesc: "Designed and built an end-to-end analytics solution connecting to SQL databases, transforming data with DAX, and visualizing KPIs including revenue trends, regional performance, and customer segmentation.",
    tags: ["Power BI", "SQL", "DAX", "Excel"],
    color: "from-accent/20 to-primary/10",
  },
  {
    title: "Automated CI/CD Pipeline",
    description: "End-to-end DevOps pipeline for ML model deployment with Docker and GitHub Actions.",
    longDesc: "Implemented a complete MLOps workflow: version control, automated testing, containerization with Docker, and continuous deployment to cloud infrastructure using GitHub Actions and monitoring.",
    tags: ["Docker", "GitHub Actions", "Python", "AWS"],
    color: "from-primary/15 to-accent/15",
  },
  {
    title: "NLP Sentiment Analyzer",
    description: "Real-time sentiment analysis tool for social media content using transformer models.",
    longDesc: "Developed a sentiment classification system using fine-tuned BERT models. Processes tweets and reviews in real-time, providing sentiment scores and trend analysis through an interactive web dashboard.",
    tags: ["Python", "Hugging Face", "Streamlit", "NLP"],
    color: "from-accent/15 to-primary/20",
  },
];

const ProjectsSection = () => {
  const [selected, setSelected] = useState<(typeof projects)[0] | null>(null);

  return (
    <SectionWrapper id="projects">
      <SectionHeading title="Projects" subtitle="Selected work showcasing my technical abilities" />

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelected(project)}
            className="group cursor-pointer glass-card rounded-xl overflow-hidden hover-lift"
          >
            {/* Color strip */}
            <div className={`h-40 bg-gradient-to-br ${project.color} flex items-center justify-center`}>
              <span className="text-4xl font-display font-bold text-foreground/10 group-hover:text-foreground/20 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="p-6">
              <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs font-mono px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">
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
        <DialogContent className="glass-card border-border max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">{selected?.title}</DialogTitle>
            <DialogDescription className="text-muted-foreground mt-2">{selected?.longDesc}</DialogDescription>
          </DialogHeader>
          <div className="flex flex-wrap gap-2 mt-4">
            {selected?.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono px-3 py-1 rounded-full bg-secondary text-muted-foreground">
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-3 mt-6">
            <button className="px-5 py-2 rounded-full bg-foreground text-background text-sm font-medium hover-lift transition-all">
              Live Demo
            </button>
            <button className="px-5 py-2 rounded-full border border-border text-foreground text-sm font-medium hover-lift transition-all">
              GitHub
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default ProjectsSection;
