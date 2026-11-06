export type Cert = {
  title: string;
  issuer: string;
  issued: string;
  skills: string[];
  url?: string;
  /** Independent verification page, e.g. a Credly badge. Shown with a "Verified" treatment. */
  verifyUrl?: string;
  /** Locally hosted certificate PDF, for credentials that have no online verification link. */
  file?: string;
};

export const certifications: Cert[] = [
  {
    title: "Software Engineer (Role Certification)",
    issuer: "HackerRank",
    issued: "Nov 2026",
    skills: ["Software Engineering"],
    url: "https://www.hackerrank.com/certificates/2166c58cac22",
  },
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
    title: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    issued: "Apr 2023",
    skills: ["Network Fundamentals", "IPv4 & IPv6 Addressing", "Ethernet & Switching", "Security Fundamentals"],
    // The PDF certificate carries no verification link; the Credly badge is the verifiable record.
    verifyUrl: "https://www.credly.com/badges/6452e568-83d6-4f3d-98a4-da6598128ebc",
    file: "/certificates/cisco-ccna-introduction-to-networks.pdf",
  },
  {
    title: "Responsive Web Design",
    issuer: "freeCodeCamp",
    issued: "May 2020",
    skills: ["Web Design & Development"],
    // TODO: add the freeCodeCamp credential URL
  },
];
