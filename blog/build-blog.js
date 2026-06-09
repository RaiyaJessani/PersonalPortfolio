import fs from "fs";
import path from "path";
import matter from "gray-matter";

const WEEKS_DIR = "./weeks";
const OUTPUT_FILE = "./generated/index.json";

function readMarkdown(filePath) {
  const file = fs.readFileSync(filePath, "utf-8");
  const parsed = matter(file);

  return {
    ...parsed.data,
    content: parsed.content
  };
}

function getFolders(dir) {
  return fs.readdirSync(dir)
    .filter(f => fs.statSync(path.join(dir, f)).isDirectory())
    .sort((a, b) => a.localeCompare(b));
}

function getMarkdownFiles(dir) {
  return fs.readdirSync(dir)
    .filter(f => f.endsWith(".md"));
}

function normalizeTags(tags) {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  return tags.split(",").map(t => t.trim());
}

function build() {
  const weeks = getFolders(WEEKS_DIR);

  const result = {
    latestWeek: null,
    weeks: []
  };

  let latestIndex = 0;

  weeks.forEach((weekId, idx) => {
    const weekPath = path.join(WEEKS_DIR, weekId);

    const posts = getMarkdownFiles(weekPath).map(file => {
      const post = readMarkdown(path.join(weekPath, file));

      return {
        title: post.title || "Untitled",
        date: post.date || "N/A",
        author: post.author || "Raiya Jessani",
        source: post.source || "",
        sourceUrl: post.sourceUrl || "",
        summary: post.summary || "",
        tags: normalizeTags(post.tags),
        content: post.content || "",
        slug: file
          .replace(".md", "")
          .toLowerCase()
          .replace(/\s+/g, "-")
      };

      
    });

    result.weeks.push({
      id: weekId,
      week: weekId,
      posts
    });

    latestIndex = idx;
  });

  result.latestWeek = weeks[latestIndex];

  fs.mkdirSync("./generated", { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log("✅ Blog built from Markdown");
}

build();