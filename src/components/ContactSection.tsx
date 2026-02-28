import { motion } from "framer-motion";
import SectionWrapper from "./SectionWrapper";
import { SectionHeading } from "./AboutSection";
import { Github, Linkedin, Mail, Phone, MapPin, ExternalLink } from "lucide-react";

const socials = [
  {
    name: "GitHub",
    handle: "@Naveenkumar172003",
    href: "https://github.com/Naveenkumar172003",
    icon: Github,
    color: "#9CD5FF",
    desc: "Check out my repos & open source work",
  },
  {
    name: "LinkedIn",
    handle: "Naveen Kumar",
    href: "https://www.linkedin.com/in/naveen-kumar-4a4346295?utm_source=share_via&utm_content=profile&utm_medium=member_android",
    icon: Linkedin,
    color: "#7AAACE",
    desc: "Connect with me professionally",
  },
];

const contactInfo = [
  { icon: Mail,   label: "Email",    value: "naveensnk067@gmail.com", href: "mailto:naveensnk067@gmail.com", color: "#7AAACE" },
  { icon: Phone,  label: "Phone",    value: "+91 6385449637",         href: "tel:+916385449637",             color: "#9CD5FF" },
  { icon: MapPin, label: "Location", value: "Tamil Nadu, India",      href: null,                            color: "#7AAACE" },
];

const ContactSection = () => {
  return (
    <SectionWrapper id="contact" className="bg-secondary/10">
      <SectionHeading title="Get In Touch" subtitle="Let's connect and build something amazing together" />

      <div className="max-w-4xl mx-auto space-y-12">

        {/* Contact info row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {contactInfo.map((info, i) => {
            const Icon = info.icon;
            const content = (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 160 }}
                whileHover={{ scale: 1.03, y: -2 }}
                className="flex items-center gap-4 rounded-2xl p-5"
                style={{
                  background: "hsl(206 40% 13% / 0.7)",
                  border: `1px solid ${info.color}25`,
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 20px ${info.color}25`;
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${info.color}55`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                  (e.currentTarget as HTMLDivElement).style.borderColor = `${info.color}25`;
                }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${info.color}18`, border: `1px solid ${info.color}35` }}
                >
                  <Icon size={17} style={{ color: info.color }} strokeWidth={1.8} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-mono">{info.label}</p>
                  <p className="text-sm font-semibold mt-0.5" style={{ color: info.color }}>{info.value}</p>
                </div>
                {info.href && (
                  <ExternalLink size={13} className="ml-auto" style={{ color: `${info.color}60` }} />
                )}
              </motion.div>
            );
            return info.href ? (
              <a key={info.label} href={info.href} target="_blank" rel="noopener noreferrer" className="block">
                {content}
              </a>
            ) : (
              <div key={info.label}>{content}</div>
            );
          })}
        </motion.div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, transparent, #35587260)" }} />
          <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest px-3">Social</span>
          <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, #35587260, transparent)" }} />
        </div>

        {/* Social media cards */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-2xl mx-auto w-full">
          {socials.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring", stiffness: 140 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden group"
                style={{
                  background: "hsl(206 40% 13% / 0.7)",
                  border: `1px solid ${social.color}25`,
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 0 30px ${social.color}30`;
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${social.color}60`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${social.color}25`;
                }}
              >
                {/* Background glow */}
                <div
                  className="absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  style={{ background: social.color }}
                />
                {/* Icon */}
                <motion.div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{ background: `${social.color}18`, border: `1px solid ${social.color}35` }}
                  animate={{ boxShadow: [`0 0 8px ${social.color}20`, `0 0 18px ${social.color}45`, `0 0 8px ${social.color}20`] }}
                  transition={{ duration: 3, repeat: Infinity, delay: i * 0.6 }}
                >
                  <Icon size={22} style={{ color: social.color }} strokeWidth={1.6} />
                </motion.div>
                <div>
                  <p className="font-display font-bold text-base" style={{ color: "#F7F8F0" }}>{social.name}</p>
                  <p className="text-xs font-mono mt-0.5 mb-2" style={{ color: social.color }}>{social.handle}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{social.desc}</p>
                </div>
                <div className="flex items-center gap-1.5 mt-auto">
                  <span className="text-xs font-mono" style={{ color: `${social.color}80` }}>Visit</span>
                  <ExternalLink size={11} style={{ color: `${social.color}80` }} />
                </div>
              </motion.a>
            );
          })}
        </div>

      </div>

    </SectionWrapper>
  );
};

export default ContactSection;