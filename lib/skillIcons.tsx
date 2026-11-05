import type { ReactNode } from "react";
import {
  siPython, siOpenjdk, siJavascript, siC, siCplusplus, siHtml5, siReact, siNextdotjs, siNodedotjs,
  siGraphql, siFlutter, siMysql, siMongodb, siLinux, siGithub, siDocker, siFigma, siPostman,
  siSelenium, siPandas, siGooglesheets, siBootstrap, siTailwindcss,
} from "simple-icons";
import {
  Database, MonitorSmartphone, Webhook, Binary, Boxes, Table, Network, Blocks, MousePointerClick,
  ClipboardList, ShieldCheck, KeyRound, Bug, BrainCircuit, ChartColumn, Component, ListChecks,
  RefreshCw, FileText, MessagesSquare, Code2, Globe, Smartphone, Cpu, FlaskConical, Cloud, Palette,
  LayoutGrid, Lightbulb, Scale, Compass, Users, Flag, User, Gauge, Sparkles, Shuffle, HeartHandshake,
  type LucideIcon,
} from "lucide-react";

type Brand = { path: string; hex: string; title: string };

const brands: Record<string, Brand> = {
  Python: siPython, Java: siOpenjdk, JavaScript: siJavascript, C: siC, "C++": siCplusplus,
  "HTML & CSS": siHtml5, Bootstrap: siBootstrap, "Tailwind CSS": siTailwindcss, React: siReact, "Next.js": siNextdotjs, "Node.js": siNodedotjs, GraphQL: siGraphql,
  Flutter: siFlutter, "Relational databases (MySQL)": siMysql, "NoSQL (MongoDB)": siMongodb,
  Linux: siLinux, "Git & GitHub": siGithub, Docker: siDocker, "Figma / UI design": siFigma,
  "API testing (Postman)": siPostman, "Test automation (Selenium)": siSelenium,
  "pandas & NumPy": siPandas, "Excel / Google Sheets": siGooglesheets,
};

const lucide: Record<string, LucideIcon> = {
  SQL: Database, "Responsive design": MonitorSmartphone, "REST APIs": Webhook,
  "Data structures & algorithms": Binary, "Object-oriented programming": Boxes, "DBMS concepts": Table,
  "Computer networks": Network, "System design basics": Blocks, "Manual testing": MousePointerClick,
  "Test case design": ClipboardList, "Network security": ShieldCheck, "Cryptography basics": KeyRound,
  "Penetration-testing basics": Bug, "Machine learning": BrainCircuit, "Power BI / Tableau": ChartColumn,
  "Design systems": Component, "Requirements analysis": ListChecks, "Agile / Scrum": RefreshCw,
  "Technical writing": FileText, "Clear communication": MessagesSquare,
  "Problem-solving": Lightbulb, "Critical thinking": Scale, "Decision-making": Compass, Teamwork: Users,
  Leadership: Flag, "Working independently": User, "Working under pressure": Gauge,
  Resourcefulness: Sparkles, Flexibility: Shuffle,
};

export const categoryIcons: Record<string, LucideIcon> = {
  all: LayoutGrid, languages: Code2, web: Globe, mobile: Smartphone, cs: Cpu, databases: Database,
  testing: FlaskConical, devops: Cloud, security: ShieldCheck, data: BrainCircuit, design: Palette, soft: HeartHandshake,
};

// Very dark brand colours (GitHub, Next.js) vanish on the dark theme, so they follow the text colour.
function isDark(hex: string) {
  const n = parseInt(hex, 16);
  const l = (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l < 0.3;
}

export function SkillIcon({ skill, size = 16 }: { skill: string; size?: number }): ReactNode {
  const b = brands[skill];
  if (b) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" fill={isDark(b.hex) ? "currentColor" : `#${b.hex}`}>
        <path d={b.path} />
      </svg>
    );
  }
  const Icon = lucide[skill] ?? Code2;
  return <Icon size={size} strokeWidth={1.9} aria-hidden="true" className="text-accent" />;
}
