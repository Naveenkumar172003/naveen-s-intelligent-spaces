import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ResumeSection = () => {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <SectionWrapper id="resume">
      <SectionHeading title="Resume" subtitle="A summary of my experience and qualifications" />

      <div className="glass-card rounded-xl p-8 md:p-12 text-center max-w-2xl mx-auto">
        <div className="mb-6">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <h3 className="font-display text-xl font-semibold text-foreground mb-2">
            Naveen Kumar — Resume
          </h3>
          <p className="text-sm text-muted-foreground">
            B.Tech in AI & Data Science · Python · ML · Power BI · DevOps
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPreview(true)}
            className="px-6 py-3 rounded-full bg-foreground text-background font-medium text-sm hover-lift transition-all"
          >
            Preview Resume
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-6 py-3 rounded-full border border-border text-foreground font-medium text-sm hover-lift transition-all"
          >
            Download PDF
          </motion.button>
        </div>
      </div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="glass-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">Resume Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {[
              { section: "Education", content: "B.Tech in Artificial Intelligence & Data Science" },
              { section: "Skills", content: "Python, TensorFlow, Power BI, Docker, Git, SQL, Machine Learning, NLP" },
              { section: "Experience", content: "Multiple academic and competition projects in AI/ML" },
              { section: "Interests", content: "Deep Learning, MLOps, Data Visualization, Automation" },
            ].map((item) => (
              <div key={item.section} className="border-b border-border pb-4 last:border-0">
                <h4 className="text-sm font-mono text-primary uppercase tracking-wider mb-2">{item.section}</h4>
                <p className="text-sm text-foreground/80">{item.content}</p>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default ResumeSection;
