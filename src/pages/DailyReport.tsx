import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Save,
  Trash2,
  FileText,
  CalendarDays,
  Building2,
  ClipboardList,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";
import jsPDF from "jspdf";

// SHA-256 hash of the access password (never stored in plain text)
const ACCESS_HASH = "42ad2290d080fa3c7e4b88fc2d3382887a9509c9fa15771a0977fd4982f0b0cd";
const SESSION_KEY = "nk_report_auth";

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// ─── Password Gate ─────────────────────────────────────────────────────────────
function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shaking, setShaking] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 400); }, []);

  const attempt = async () => {
    const hash = await sha256(value);
    if (hash === ACCESS_HASH) {
      sessionStorage.setItem(SESSION_KEY, "1");
      onUnlock();
    } else {
      setError(true);
      setShaking(true);
      setTimeout(() => setShaking(false), 600);
      setTimeout(() => setError(false), 2000);
      setValue("");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0d1b26" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.88, y: 30 }}
        animate={shaking
          ? { opacity: 1, scale: 1, x: [-10, 10, -8, 8, -4, 4, 0] }
          : { opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={shaking ? { duration: 0.5 } : { type: "spring", stiffness: 200, damping: 20 }}
        className="relative w-full max-w-sm mx-4 rounded-3xl p-8 flex flex-col items-center"
        style={{
          background: "hsl(206 40% 13%)",
          border: `1px solid ${error ? "#ff444450" : "#35587240"}`,
          boxShadow: error ? "0 0 30px #ff444425" : "0 0 40px #9CD5FF10",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* Icon */}
        <motion.div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
          style={{ background: "#355872 30", border: "1px solid #7AAACE40" }}
          animate={{ boxShadow: ["0 0 12px #9CD5FF20", "0 0 28px #9CD5FF50", "0 0 12px #9CD5FF20"] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          {error
            ? <motion.div animate={{ rotate: [0, -15, 15, 0] }} transition={{ duration: 0.4 }}>
                <Lock size={28} color="#ff6666" />
              </motion.div>
            : <Lock size={28} color="#9CD5FF" />}
        </motion.div>

        <p className="font-bold text-lg mb-1" style={{ color: "#F7F8F0" }}>Access Required</p>
        <p className="text-xs text-center mb-7" style={{ color: "#7AAACE" }}>
          Enter the password to access your daily report system
        </p>

        {/* Input */}
        <div className="relative w-full mb-4">
          <input
            ref={inputRef}
            type={show ? "text" : "password"}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && value && attempt()}
            placeholder="Enter password..."
            className="w-full px-4 py-3.5 pr-12 rounded-xl text-sm outline-none"
            style={{
              background: "hsl(206 45% 10%)",
              border: `1.5px solid ${error ? "#ff444460" : "#7AAACE40"}`,
              color: "#F7F8F0",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = "#9CD5FF70"; e.currentTarget.style.boxShadow = "0 0 16px #9CD5FF20"; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = error ? "#ff444460" : "#7AAACE40"; e.currentTarget.style.boxShadow = "none"; }}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1"
            style={{ color: "#7AAACE80" }}
            tabIndex={-1}
          >
            {show ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-xs mb-3 font-medium"
              style={{ color: "#ff6666" }}
            >
              Incorrect password. Try again.
            </motion.p>
          )}
        </AnimatePresence>

        {/* Submit */}
        <motion.button
          onClick={attempt}
          disabled={!value}
          className="w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2"
          style={{
            background: value
              ? "linear-gradient(135deg, #355872, #7AAACE)"
              : "#35587220",
            color: value ? "#F7F8F0" : "#7AAACE60",
            cursor: value ? "pointer" : "not-allowed",
            transition: "background 0.3s",
          }}
          whileHover={value ? { scale: 1.02, boxShadow: "0 0 20px #7AAACE50" } : {}}
          whileTap={value ? { scale: 0.97 } : {}}
        >
          <ShieldCheck size={15} />
          Unlock Reports
        </motion.button>

        <Link to="/" className="mt-5 text-xs" style={{ color: "#7AAACE60" }}>
          ← Back to Portfolio
        </Link>
      </motion.div>
    </div>
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────
interface ReportEntry {
  company: string;
  report: string;
  savedAt: string;
}
type ReportStore = Record<string, ReportEntry>;

const STORAGE_KEY = "nk_daily_reports";
const PALETTE = {
  bg: "#0d1b26",
  card: "hsl(206 40% 13%)",
  border: "#35587240",
  accent1: "#355872",
  accent2: "#7AAACE",
  accent3: "#9CD5FF",
  fg: "#F7F8F0",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
const toKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

const formatDisplay = (key: string) => {
  const [y, m, d] = key.split("-");
  return new Date(+y, +m - 1, +d).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDaysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const getFirstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay(); // 0=Sun

const MONTH_NAMES = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];
const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ─── PDF Generator ────────────────────────────────────────────────────────────
const generatePDF = (reports: ReportStore, onlyKey?: string) => {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  let y = 20;

  // Header
  doc.setFillColor(13, 27, 38);
  doc.rect(0, 0, W, 30, "F");
  doc.setTextColor(156, 213, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Daily Work Report", 14, 13);
  doc.setTextColor(122, 170, 206);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Generated by Naveen Kumar — NK Portfolio", 14, 20);
  doc.text(`Generated: ${new Date().toLocaleString("en-IN")}`, 14, 26);
  y = 40;

  const entries = Object.entries(reports)
    .filter(([k]) => (onlyKey ? k === onlyKey : true))
    .sort(([a], [b]) => a.localeCompare(b));

  if (entries.length === 0) {
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(12);
    doc.text("No reports found.", 14, y);
    doc.save("daily_report.pdf");
    return;
  }

  for (const [key, entry] of entries) {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }

    // Date header
    doc.setFillColor(53, 88, 114);
    doc.roundedRect(10, y, W - 20, 10, 2, 2, "F");
    doc.setTextColor(247, 248, 240);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(formatDisplay(key), 14, y + 7);
    y += 14;

    // Company
    doc.setTextColor(122, 170, 206);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("Company:", 14, y);
    doc.setTextColor(247, 248, 240);
    doc.setFont("helvetica", "normal");
    doc.text(entry.company || "—", 38, y);
    y += 6;

    // Report body
    doc.setTextColor(122, 170, 206);
    doc.setFont("helvetica", "bold");
    doc.text("Report:", 14, y);
    y += 5;
    doc.setTextColor(200, 210, 220);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const lines = doc.splitTextToSize(entry.report || "—", W - 30);
    doc.text(lines, 14, y);
    y += lines.length * 5 + 6;

    // Separator
    doc.setDrawColor(53, 88, 114);
    doc.setLineWidth(0.3);
    doc.line(10, y, W - 10, y);
    y += 8;
  }

  doc.save(onlyKey ? `report_${onlyKey}.pdf` : "all_reports.pdf");
};

// ─── Main Component ───────────────────────────────────────────────────────────
function ReportApp() {
  const today = new Date();
  const todayKey = toKey(today);

  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [reports, setReports] = useState<ReportStore>({});
  const [form, setForm] = useState({ company: "", report: "" });
  const [saved, setSaved] = useState(false);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setReports(JSON.parse(raw));
    } catch {}
  }, []);

  // Sync form when selectedKey changes
  useEffect(() => {
    if (selectedKey && reports[selectedKey]) {
      setForm({ company: reports[selectedKey].company, report: reports[selectedKey].report });
    } else {
      setForm({ company: "", report: "" });
    }
    setSaved(false);
  }, [selectedKey]);

  const saveReport = useCallback(() => {
    if (!selectedKey) return;
    const updated: ReportStore = {
      ...reports,
      [selectedKey]: {
        company: form.company,
        report: form.report,
        savedAt: new Date().toISOString(),
      },
    };
    setReports(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }, [selectedKey, form, reports]);

  const deleteReport = useCallback(() => {
    if (!selectedKey || !reports[selectedKey]) return;
    const updated = { ...reports };
    delete updated[selectedKey];
    setReports(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setForm({ company: "", report: "" });
  }, [selectedKey, reports]);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  };

  // Build calendar grid
  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const totalReports = Object.keys(reports).length;

  return (
    <div
      className="min-h-screen"
      style={{ background: PALETTE.bg, color: PALETTE.fg, fontFamily: "'Inter', sans-serif" }}
    >
      {/* Top bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
        style={{ background: `${PALETTE.bg}ee`, backdropFilter: "blur(14px)", borderBottom: `1px solid ${PALETTE.border}` }}
      >
        <Link to="/">
          <motion.div
            className="flex items-center gap-2.5 text-sm font-medium cursor-pointer px-4 py-2 rounded-full"
            style={{ border: `1px solid ${PALETTE.accent2}40`, color: PALETTE.accent2 }}
            whileHover={{ scale: 1.04, boxShadow: `0 0 15px ${PALETTE.accent2}30` }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </motion.div>
        </Link>

        <div className="flex items-center gap-3">
          <CalendarDays size={18} style={{ color: PALETTE.accent3 }} />
          <span className="font-bold text-base" style={{ color: PALETTE.fg }}>Daily Report</span>
          {totalReports > 0 && (
            <span
              className="text-xs px-2 py-0.5 rounded-full font-mono"
              style={{ background: `${PALETTE.accent3}20`, color: PALETTE.accent3, border: `1px solid ${PALETTE.accent3}35` }}
            >
              {totalReports} saved
            </span>
          )}
        </div>

        <motion.button
          onClick={() => generatePDF(reports)}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full"
          style={{
            background: `linear-gradient(135deg, ${PALETTE.accent1}, ${PALETTE.accent2})`,
            color: PALETTE.fg,
          }}
          whileHover={{ scale: 1.04, boxShadow: `0 0 20px ${PALETTE.accent2}50` }}
          whileTap={{ scale: 0.97 }}
          disabled={totalReports === 0}
          title="Download all reports as PDF"
        >
          <FileText size={15} />
          All Reports PDF
        </motion.button>
      </div>

      {/* Main layout */}
      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-6xl mx-auto">

        {/* Calendar */}
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl p-6"
            style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}` }}
          >
            {/* Month nav */}
            <div className="flex items-center justify-between mb-6">
              <motion.button
                onClick={prevMonth}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${PALETTE.accent1}30`, border: `1px solid ${PALETTE.accent1}50`, color: PALETTE.accent3 }}
                whileHover={{ scale: 1.1, boxShadow: `0 0 12px ${PALETTE.accent1}60` }}
                whileTap={{ scale: 0.93 }}
              >
                <ChevronLeft size={18} />
              </motion.button>

              <div className="text-center">
                <p className="font-bold text-lg" style={{ color: PALETTE.fg }}>
                  {MONTH_NAMES[viewMonth]}
                </p>
                <p className="text-xs font-mono" style={{ color: PALETTE.accent2 }}>{viewYear}</p>
              </div>

              <motion.button
                onClick={nextMonth}
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: `${PALETTE.accent1}30`, border: `1px solid ${PALETTE.accent1}50`, color: PALETTE.accent3 }}
                whileHover={{ scale: 1.1, boxShadow: `0 0 12px ${PALETTE.accent1}60` }}
                whileTap={{ scale: 0.93 }}
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAY_LABELS.map((d) => (
                <div key={d} className="text-center text-xs font-mono font-semibold py-1.5" style={{ color: PALETTE.accent2 }}>
                  {d}
                </div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, idx) => {
                if (day === null) return <div key={`empty-${idx}`} />;
                const key = `${viewYear}-${String(viewMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const isToday = key === todayKey;
                const isSelected = key === selectedKey;
                const hasSave = !!reports[key];
                const isFuture = key > todayKey;

                return (
                  <motion.button
                    key={key}
                    onClick={() => !isFuture && setSelectedKey(key)}
                    className="relative aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-semibold"
                    style={{
                      background: isSelected
                        ? `linear-gradient(135deg, ${PALETTE.accent1}, ${PALETTE.accent2})`
                        : isToday
                        ? `${PALETTE.accent3}18`
                        : hasSave
                        ? `${PALETTE.accent1}25`
                        : "transparent",
                      border: isSelected
                        ? `1.5px solid ${PALETTE.accent3}80`
                        : isToday
                        ? `1.5px solid ${PALETTE.accent3}60`
                        : `1px solid transparent`,
                      color: isSelected ? PALETTE.fg : isFuture ? `${PALETTE.fg}25` : PALETTE.fg,
                      cursor: isFuture ? "not-allowed" : "pointer",
                    }}
                    whileHover={!isFuture ? { scale: 1.1, boxShadow: `0 0 12px ${PALETTE.accent2}40` } : {}}
                    whileTap={!isFuture ? { scale: 0.95 } : {}}
                    title={hasSave ? `Report saved: ${reports[key].company}` : undefined}
                  >
                    {day}
                    {hasSave && (
                      <motion.span
                        className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                        style={{ background: isSelected ? PALETTE.fg : PALETTE.accent3 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring" }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-5 mt-5 text-xs" style={{ color: `${PALETTE.fg}60` }}>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: PALETTE.accent3 }} />
                Today
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ background: PALETTE.accent1 }} />
                Has Report
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 rounded" style={{ background: `linear-gradient(90deg, ${PALETTE.accent1}, ${PALETTE.accent2})` }} />
                Selected
              </span>
            </div>
          </motion.div>

          {/* All saved reports mini list */}
          {Object.keys(reports).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 rounded-2xl p-4"
              style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}` }}
            >
              <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: PALETTE.accent2 }}>
                Saved Entries
              </p>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                {Object.entries(reports)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([key, entry]) => (
                    <motion.button
                      key={key}
                      onClick={() => {
                        const [y, m] = key.split("-");
                        setViewYear(+y);
                        setViewMonth(+m - 1);
                        setSelectedKey(key);
                      }}
                      className="w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl"
                      style={{
                        background: selectedKey === key ? `${PALETTE.accent1}40` : `${PALETTE.accent1}15`,
                        border: `1px solid ${selectedKey === key ? PALETTE.accent2 + "60" : PALETTE.border}`,
                      }}
                      whileHover={{ scale: 1.01 }}
                    >
                      <CalendarDays size={13} style={{ color: PALETTE.accent3, flexShrink: 0 }} />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold truncate" style={{ color: PALETTE.fg }}>{key}</p>
                        <p className="text-xs truncate" style={{ color: PALETTE.accent2 }}>{entry.company || "—"}</p>
                      </div>
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Report Form Panel */}
        <div className="lg:w-96 xl:w-[420px]">
          <AnimatePresence mode="wait">
            {selectedKey ? (
              <motion.div
                key={selectedKey}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="rounded-3xl p-6 h-full"
                style={{ background: PALETTE.card, border: `1px solid ${PALETTE.border}` }}
              >
                {/* Date heading */}
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest mb-1" style={{ color: PALETTE.accent2 }}>
                      Daily Report
                    </p>
                    <p className="font-bold text-base leading-snug" style={{ color: PALETTE.fg }}>
                      {formatDisplay(selectedKey)}
                    </p>
                  </div>
                  {reports[selectedKey] && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full font-mono mt-1"
                      style={{ background: `${PALETTE.accent3}18`, color: PALETTE.accent3, border: `1px solid ${PALETTE.accent3}35` }}
                    >
                      Saved
                    </span>
                  )}
                </div>

                {/* Company name */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2" style={{ color: PALETTE.accent2 }}>
                    <Building2 size={12} />
                    Company / Organisation
                  </label>
                  <input
                    type="text"
                    value={form.company}
                    onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                    placeholder="e.g. TCS, Infosys, Internship Company..."
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none placeholder-gray-500"
                    style={{
                      background: "hsl(206 45% 10%)",
                      border: `1px solid ${PALETTE.accent1}50`,
                      color: PALETTE.fg,
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PALETTE.accent3 + "80";
                      e.currentTarget.style.boxShadow = `0 0 15px ${PALETTE.accent3}20`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = PALETTE.accent1 + "50";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Day report */}
                <div className="mb-5">
                  <label className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest mb-2" style={{ color: PALETTE.accent2 }}>
                    <ClipboardList size={12} />
                    Day Report
                  </label>
                  <textarea
                    value={form.report}
                    onChange={(e) => setForm((f) => ({ ...f, report: e.target.value }))}
                    placeholder={"What did you work on today?\n\n• Task 1\n• Task 2\n• Learnings..."}
                    rows={9}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none placeholder-gray-500 leading-relaxed"
                    style={{
                      background: "hsl(206 45% 10%)",
                      border: `1px solid ${PALETTE.accent1}50`,
                      color: PALETTE.fg,
                      transition: "border-color 0.3s, box-shadow 0.3s",
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = PALETTE.accent3 + "80";
                      e.currentTarget.style.boxShadow = `0 0 15px ${PALETTE.accent3}20`;
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = PALETTE.accent1 + "50";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <div className="flex gap-3">
                    <motion.button
                      onClick={saveReport}
                      className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold"
                      style={{
                        background: saved
                          ? `${PALETTE.accent3}30`
                          : `linear-gradient(135deg, ${PALETTE.accent1}, ${PALETTE.accent2})`,
                        color: PALETTE.fg,
                        border: saved ? `1px solid ${PALETTE.accent3}60` : "none",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${PALETTE.accent2}50` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Save size={15} />
                      {saved ? "Saved ✓" : "Save Report"}
                    </motion.button>

                    {reports[selectedKey] && (
                      <motion.button
                        onClick={deleteReport}
                        className="w-12 flex items-center justify-center rounded-xl"
                        style={{
                          background: "#ff444415",
                          border: "1px solid #ff444430",
                          color: "#ff6666",
                        }}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 12px #ff444440" }}
                        whileTap={{ scale: 0.95 }}
                        title="Delete this report"
                      >
                        <Trash2 size={15} />
                      </motion.button>
                    )}
                  </div>

                  {reports[selectedKey] && (
                    <motion.button
                      onClick={() => generatePDF(reports, selectedKey!)}
                      className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium"
                      style={{
                        background: `${PALETTE.accent3}15`,
                        border: `1px solid ${PALETTE.accent3}35`,
                        color: PALETTE.accent3,
                      }}
                      whileHover={{ scale: 1.02, boxShadow: `0 0 16px ${PALETTE.accent3}25` }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download size={15} />
                      Download This Report PDF
                    </motion.button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-3xl p-10 flex flex-col items-center justify-center text-center h-full min-h-[420px]"
                style={{ background: PALETTE.card, border: `1px dashed ${PALETTE.border}` }}
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: `${PALETTE.accent1}25`, border: `1px solid ${PALETTE.accent1}50` }}
                >
                  <CalendarDays size={28} style={{ color: PALETTE.accent3 }} />
                </motion.div>
                <p className="font-bold text-base mb-2" style={{ color: PALETTE.fg }}>
                  Select a Date
                </p>
                <p className="text-sm leading-relaxed" style={{ color: `${PALETTE.fg}60` }}>
                  Click any date on the calendar to add or view your daily work report
                </p>
                <div
                  className="mt-6 text-xs font-mono px-4 py-2 rounded-full"
                  style={{ background: `${PALETTE.accent1}20`, color: PALETTE.accent2, border: `1px solid ${PALETTE.accent1}40` }}
                >
                  Future dates are disabled
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Gated Export ─────────────────────────────────────────────────────────────
export default function DailyReport() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem(SESSION_KEY) === "1");

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />;
  }
  return <ReportApp />;
}
