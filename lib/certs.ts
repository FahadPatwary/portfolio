export type Cert = {
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  url?: string;
};

export const certifications: Cert[] = [
  {
    title: "Oops in Java",
    issuer: "Coding Ninjas",
    issued: "Jun 2023",
    skills: ["Object-Oriented Programming", "Java"],
    url: "https://ninjasfiles.s3.amazonaws.com/certificate-346963-81a211baaf2e4a7ac7f7350f8f46e503.pdf",
  },
  {
    title: "Basics of Java",
    issuer: "Coding Ninjas",
    issued: "Jun 2023",
    skills: ["Java"],
    url: "https://ninjasfiles.s3.amazonaws.com/certificate-333956-b20b10651bec12a55649ef36a50d8511.pdf",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issued: "May 2020",
    skills: ["Web Design & Development"],
    // TODO: add the freeCodeCamp credential URL
  },
];
