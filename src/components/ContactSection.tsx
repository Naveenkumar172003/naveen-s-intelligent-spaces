import { useState } from "react";
import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";

const socials = [
  { name: "GitHub", icon: "GH", href: "#" },
  { name: "LinkedIn", icon: "LI", href: "#" },
  { name: "Twitter", icon: "TW", href: "#" },
  { name: "Email", icon: "EM", href: "mailto:naveen@example.com" },
];

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder for form submission
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <SectionWrapper id="contact" className="bg-secondary/30">
      <SectionHeading title="Get In Touch" subtitle="Let's connect and build something amazing together" />

      <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-5"
        >
          {[
            { key: "name", label: "Name", type: "text" },
            { key: "email", label: "Email", type: "email" },
          ].map((field) => (
            <div key={field.key}>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{field.label}</label>
              <input
                type={field.type}
                value={formState[field.key as keyof typeof formState]}
                onChange={(e) => setFormState((s) => ({ ...s, [field.key]: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                required
              />
            </div>
          ))}
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
            <textarea
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState((s) => ({ ...s, message: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-card border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="w-full py-3 rounded-full bg-foreground text-background font-medium text-sm hover-lift transition-all"
          >
            Send Message
          </motion.button>
        </motion.form>

        {/* Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center"
        >
          <p className="text-foreground/80 leading-relaxed mb-8">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part 
            of something innovative. Feel free to reach out!
          </p>

          <div className="flex gap-4">
            {socials.map((social) => (
              <motion.a
                key={social.name}
                href={social.href}
                whileHover={{ y: -3, scale: 1.05 }}
                className="w-12 h-12 rounded-full glass-card flex items-center justify-center text-sm font-mono font-semibold text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="mt-20 pt-8 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Naveen Kumar. Crafted with passion.
        </p>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
