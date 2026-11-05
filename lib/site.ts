export const site = {
  name: "Fahad Ahmed Patwary",
  title: "Fahad Ahmed Patwary — Software Engineer & ML Researcher",
  description:
    "Fahad Ahmed Patwary is a software engineer and ML researcher from Dhaka. He designs and tests full-stack systems, and researches smaller, faster, greener deep learning.",
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
