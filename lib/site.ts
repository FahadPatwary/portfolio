export const site = {
  name: "Fahad Ahmed Patwary",
  title: "Fahad Ahmed Patwary (Fahad Patwary) — Software Engineer & ML Researcher",
  // Name variants people search for. Used in structured data, not as hidden text.
  alternateNames: ["Fahad Patwary", "Fahad Ahmed", "Fahad", "Patwary", "Fahad Ahmed Patwary"],
  description:
    "Fahad Ahmed Patwary (Fahad Patwary) is a software engineer and ML researcher from Dhaka, Bangladesh. Offline-first apps, software testing and Green AI research.",
  keywords: [
    "Fahad Ahmed Patwary", "Fahad Patwary", "Fahad Ahmed", "Fahad", "Patwary",
    "Fahad Patwary portfolio", "Fahad Patwary software engineer", "Fahad Patwary UIU",
    "software engineer Bangladesh", "ML researcher Bangladesh", "PustiPath", "Green AI",
  ],
  locale: "en_US",
  url: "https://fahadpatwary.com",
  email: "fahadpatwary21@gmail.com",
  github: "https://github.com/FahadPatwary",
  // TODO: replace with your exact LinkedIn URL
  linkedin: "https://www.linkedin.com/in/fahadpatwary",
  cv: "/Fahad_Ahmed_Patwary_CV.pdf",
  tags: ["Full-Stack", "System Design", "Software Testing", "Machine Learning", "Green AI"],
  facts: [
    { k: "University", v: "UIU CSE" },
    { k: "Papers", v: "3" },
    { k: "Based in", v: "Dhaka" },
  ],
  education: [
    {
      level: "B.Sc. in Computer Science & Engineering",
      school: "United International University (UIU), Dhaka",
      years: "2022 – 2026", // TODO: confirm graduation year
      coursework: [
        "OOP", "Data Structures & Algorithms", "DBMS", "Operating Systems", "Computer Networks",
        "Software Engineering", "Network Security", "Cryptography",
      ],
    },
    {
      level: "Higher Secondary Certificate (HSC)",
      school: "Birshrestha Munshi Abdur Rouf Public College",
      years: "2021",
      result: "GPA 5.00 / 5.00",
    },
    {
      level: "Secondary School Certificate (SSC)",
      school: "Motijheel Model High School",
      years: "2019",
      result: "GPA 5.00 / 5.00",
    },
  ] as { level: string; school: string; years: string; result?: string; coursework?: string[] }[],
};
