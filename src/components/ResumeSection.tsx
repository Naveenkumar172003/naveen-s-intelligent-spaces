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

      <motion.div
        className="rounded-2xl p-8 md:p-12 text-center max-w-2xl mx-auto relative overflow-hidden"
        style={{
          background: "hsl(206 40% 14%)",
          border: "1px solid #35587250",
        }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* Background orbs */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-10"
          style={{ background: "#355872" }}
        />
        <div
          className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-10"
          style={{ background: "#7AAACE" }}
        />

        <div className="relative z-10 mb-8">
          <motion.div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-5 text-3xl"
            style={{
              background: "linear-gradient(135deg, hsl(206 45% 15%), hsl(206 37% 22%))",
              border: "1px solid #7AAACE50",
              boxShadow: "0 0 20px #9CD5FF25",
            }}
            animate={{
              boxShadow: [
                "0 0 15px #9CD5FF20",
                "0 0 30px #9CD5FF50",
                "0 0 15px #9CD5FF20",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            📋
          </motion.div>
          <h3
            className="font-display text-xl font-semibold mb-2"
            style={{ color: "#F7F8F0" }}
          >
            Naveen Kumar — Resume
          </h3>
          <p className="text-sm text-muted-foreground">
            B.Tech in AI & Data Science · Python · ML · Power BI · DevOps
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 25px #9CD5FF60" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowPreview(true)}
            className="px-7 py-3 rounded-full font-semibold text-sm text-white shimmer"
            style={{
              background: "var(--gradient-accent)",
              boxShadow: "0 0 18px #9CD5FF40",
            }}
          >
            Preview Resume 
          </motion.button>
          <motion.a
            href="/Naveen kumar.pdf"
            download="Naveen_Kumar_Resume.pdf"
            whileHover={{ scale: 1.05, borderColor: "#9CD5FF", boxShadow: "0 0 15px #9CD5FF20" }}
            whileTap={{ scale: 0.97 }}
            className="px-7 py-3 rounded-full font-semibold text-sm transition-all inline-block"
            style={{
              border: "1px solid #7AAACE50",
              color: "#F7F8F0",
              background: "hsl(206 40% 16% / 0.5)",
            }}
          >
            Download PDF
          </motion.a>
        </div>
      </motion.div>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent
          className="max-w-4xl w-[95vw] max-h-[90vh] overflow-hidden rounded-2xl"
          style={{
            background: "hsl(206 45% 10%)",
            border: "1px solid #35587250",
            boxShadow: "0 20px 60px #35587250",
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-display text-xl gradient-text">Resume Preview</DialogTitle>
          </DialogHeader>
          <div className="mt-2 w-full" style={{ height: "70vh" }}>
            <iframe
              src="/Naveen kumar.pdf"
              title="Naveen Kumar Resume"
              className="w-full h-full rounded-xl"
              style={{ border: "1px solid #35587240", background: "#fff" }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
};

export default ResumeSection;

