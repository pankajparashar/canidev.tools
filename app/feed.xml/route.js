import * as fs from "fs";
import path from "path";

import HJSON from "hjson";
import RSS from "rss";

export async function GET() {
  const feed = new RSS({
    title: "Can I DevTools?",
    description:
      "It is like @CanIUse but for the browser devtools, created by @pankajparashar",
    site_url: "https://canidev.tools",
    feed_url: "https://canidev.tools/feed.xml",
    copyright: "Pankaj Parashar",
    language: "en-GB",
    pubDate: new Date(),
  });

  fs.readdirSync("features").forEach((filename) => {
    const filepath = path.join("features", filename);
    const fileobj = fs.readFileSync(filepath, "utf-8");
    const mtime = fs.statSync(filepath).mtime;

    const feature = HJSON.parse(fileobj);
    const slug = path.basename(filename, ".hjson");
    feed.item({
      title: feature.title,
      url: `https://canidev.tools/${slug}`,
      date: mtime,
      description: feature.Description,
      author: feature.Authors.join(", "),
      categories: [feature.Category],
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
