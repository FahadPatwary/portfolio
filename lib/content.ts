import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Entry = {
  slug: string;
  title: string;
  summary: string;
  metric?: string;
  metricLabel?: string;
  tags: string[];
  featured?: boolean;
  order: number;
  status?: string;
  pdf?: string;
  links?: { label: string; href: string }[];
  body: string;
};

function load(dir: "projects" | "research"): Entry[] {
  const root = path.join(process.cwd(), "content", dir);
  return fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const { data, content } = matter(fs.readFileSync(path.join(root, f), "utf8"));
      return { slug: f.replace(/\.mdx$/, ""), order: 99, tags: [], ...data, body: content } as unknown as Entry;
    })
    .sort((a, b) => a.order - b.order);
}

export const getProjects = () => load("projects");
export const getResearch = () => load("research");
