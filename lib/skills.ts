export type SkillCategory = {
  id: string;
  name: string;
  blurb: string;
  skills: string[];
};

// Ordered software-first. Source: the skills ticked in the skill selector.
export const skillCategories: SkillCategory[] = [
  {
    id: "languages", name: "Languages", blurb: "What I write code in.",
    skills: ["Python", "Java", "JavaScript", "C", "C++", "SQL"],
  },
  {
    id: "web", name: "Web", blurb: "Interfaces and APIs for the browser.",
    skills: ["HTML & CSS", "Responsive design", "Bootstrap", "Tailwind CSS", "React", "Next.js", "Node.js", "REST APIs", "GraphQL"],
  },
  {
    id: "cs", name: "Core CS", blurb: "The fundamentals under everything else.",
    skills: ["Data structures & algorithms", "Object-oriented programming", "DBMS concepts", "Computer networks", "System design basics"],
  },
  {
    id: "databases", name: "Databases", blurb: "Storing and querying data.",
    skills: ["Relational databases (MySQL)", "NoSQL (MongoDB)"],
  },
  {
    id: "testing", name: "Testing", blurb: "Proving the software does what it should.",
    skills: ["Manual testing", "Test case design", "Test automation (Selenium)", "API testing (Postman)"],
  },
  {
    id: "devops", name: "Cloud & DevOps", blurb: "Shipping and running it.",
    skills: ["Linux", "Git & GitHub", "Docker"],
  },
  {
    id: "security", name: "Security", blurb: "Keeping systems safe.",
    skills: ["Network security", "Cryptography basics", "Penetration-testing basics"],
  },
  {
    id: "data", name: "Data, ML & AI", blurb: "Analysis and models.",
    skills: ["Machine learning", "pandas & NumPy", "Excel / Google Sheets", "Power BI / Tableau"],
  },
  {
    id: "design", name: "Design & Product", blurb: "Working well with people and requirements.",
    skills: ["Figma / UI design", "Design systems", "Requirements analysis", "Agile / Scrum", "Technical writing", "Clear communication"],
  },
  {
    id: "soft", name: "Soft skills", blurb: "How I work with a team and under constraints.",
    skills: ["Problem-solving", "Critical thinking", "Decision-making", "Teamwork", "Leadership", "Working independently", "Working under pressure", "Resourcefulness", "Flexibility"],
  },
];

// Only claims backed by the project report / papers.
export const usedIn: Record<string, { label: string; href: string }[]> = {
  "Next.js": [{ label: "PustiPath admin dashboard", href: "/projects/pustipath/" }],
  "Test automation (Selenium)": [{ label: "PustiPath end-to-end suite", href: "/projects/pustipath/" }],
  "Machine learning": [{ label: "Three research papers", href: "/#research" }],
  Python: [{ label: "Research experiments", href: "/#research" }],
};
