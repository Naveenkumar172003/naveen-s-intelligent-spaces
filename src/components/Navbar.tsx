import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Github, Mail, Phone } from "lucide-react";

const socialLinks = [
  { icon: Linkedin, href: "https://www.linkedin.com/in/naveen-kumar-4a4346295?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn", color: "#7AAACE", tooltip: null },
  { icon: Github, href: "https://github.com/Naveenkumar172003", label: "GitHub", color: "#9CD5FF", tooltip: null },
  { icon: Mail, href: "mailto:naveensnk067@gmail.com", label: "Email", color: "#7AAACE", tooltip: "naveensnk067@gmail.com" },
  { icon: Phone, href: "tel:+916385449637", label: "Phone", color: "#9CD5FF", tooltip: "+91 6385449637" },
];

const navItems = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 backdrop-blur-xl"
          : "py-5 bg-transparent"
      }`}
      style={
        scrolled
          ? {
              background: "hsl(206 45% 10% / 0.88)",
              borderBottom: "1px solid #35587240",
              boxShadow: "0 8px 32px #35587240, 0 0 0 1px #9CD5FF05",
            }
          : {}
      }
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Social icons */}
        <div className="flex items-center gap-4">
          {socialLinks.map(({ icon: Icon, href, label, color, tooltip }) => (
            <div key={label} className="relative group">
              <motion.a
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors duration-200"
                style={{ color }}
                whileHover={{
                  scale: 1.18,
                  backgroundColor: `${color}18`,
                  boxShadow: `0 0 12px ${color}50`,
                }}
                whileTap={{ scale: 0.92 }}
              >
                <Icon size={18} strokeWidth={1.8} />
              </motion.a>
              {tooltip && (
                <div
                  className="pointer-events-none absolute top-full mt-2 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 z-50"
                  style={{
                    background: "hsl(206 45% 13% / 0.97)",
                    border: `1px solid ${color}40`,
                    color,
                    boxShadow: `0 4px 16px ${color}30`,
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                >
                  <span
                    className="absolute -top-1.5 left-1/2 w-2.5 h-2.5"
                    style={{
                      background: "hsl(206 45% 13%)",
                      borderLeft: `1px solid ${color}40`,
                      borderTop: `1px solid ${color}40`,
                      transform: "translateX(-50%) rotate(45deg)",
                    }}
                  />
                  {tooltip}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <motion.a
                href={item.href}
                onHoverStart={() => setActiveItem(item.href)}
                onHoverEnd={() => setActiveItem("")}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: activeItem === item.href
                    ? "#9CD5FF"
                    : "#7AAACE",
                }}
                whileHover={{ color: "#9CD5FF" }}
              >
                {activeItem === item.href && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: "#9CD5FF12",
                      border: "1px solid #9CD5FF25",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </motion.a>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <motion.a
          href="#contact"
          className="hidden md:flex px-5 py-2 rounded-full text-sm font-semibold text-white"
          style={{
            background: "var(--gradient-accent)",
            boxShadow: "0 0 15px #9CD5FF40",
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px #9CD5FF60" }}
          whileTap={{ scale: 0.95 }}
        >
          Hire Me 
        </motion.a>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 rounded-full"
            style={{ background: "#9CD5FF" }}
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            className="block w-6 h-0.5 rounded-full bg-foreground/60"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-0.5 rounded-full"
            style={{ background: "#7AAACE" }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-2 mx-4 rounded-xl overflow-hidden"
            style={{
              background: "hsl(206 45% 10% / 0.95)",
              border: "1px solid #35587240",
              backdropFilter: "blur(20px)",
            }}
          >
            <ul className="flex flex-col py-3">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: "var(--gradient-accent)" }}
                    />
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
