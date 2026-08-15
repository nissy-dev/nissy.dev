import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDirectory = dirname(fileURLToPath(import.meta.url));
const rootDirectory = resolve(scriptsDirectory, "..");
const dataPath = resolve(scriptsDirectory, "data/site.json");
const templatesDirectory = resolve(scriptsDirectory, "templates");
const publicDirectory = resolve(rootDirectory, "public");
const pageNames = ["writing", "oss"];
const itemsPlaceholder = "<!-- ITEMS -->";

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const validateItems = (items, pageName) => {
  if (!Array.isArray(items)) {
    throw new TypeError(`${pageName} must be an array`);
  }

  items.forEach((item, index) => {
    const properties = {
      writing: ["title", "englishTitle", "href", "publishedAt"],
      oss: ["kind", "repo", "title", "href", "createdAt"],
    }[pageName];
    for (const property of properties) {
      if (typeof item[property] !== "string" || item[property].length === 0) {
        throw new TypeError(
          `${pageName}[${index}].${property} must be a non-empty string`,
        );
      }
    }
    const date = pageName === "writing" ? item.publishedAt : item.createdAt;
    if (date && Number.isNaN(Date.parse(date))) {
      throw new TypeError(`${pageName}[${index}] date must be valid`);
    }
    if (pageName === "oss" && !["PR", "Issue"].includes(item.kind)) {
      throw new TypeError(`${pageName}[${index}].kind must be PR or Issue`);
    }
  });
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("en-CA", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(date));

const googleTranslateUrl = (href) => {
  const url = new URL("https://translate.google.com/translate");
  url.searchParams.set("sl", "auto");
  url.searchParams.set("tl", "en");
  url.searchParams.set("u", href);
  return url.href;
};

const renderItems = (items, pageName) =>
  items
    .map((item) =>
      pageName === "writing"
        ? `          <li class="writing-item">
            <div class="writing-titles">
              <a href="${escapeHtml(item.href)}"><span>${escapeHtml(item.title)}</span></a>
              <a class="english-title" href="${escapeHtml(googleTranslateUrl(item.href))}">${escapeHtml(item.englishTitle)}</a>
            </div>
            <time datetime="${escapeHtml(item.publishedAt)}">${escapeHtml(formatDate(item.publishedAt))}</time>
          </li>`
        : `          <li>
            <a href="${escapeHtml(item.href)}">
              <span><b class="activity-type activity-type-${item.kind.toLowerCase()}">${escapeHtml(item.kind)}</b> ${escapeHtml(item.repo)}: ${escapeHtml(item.title)}</span>
              <time datetime="${escapeHtml(item.createdAt)}">${escapeHtml(formatDate(item.createdAt))}</time>
            </a>
          </li>`,
    )
    .join("\n");

const data = JSON.parse(await readFile(dataPath, "utf8"));

await Promise.all(
  pageNames.map(async (pageName) => {
    const items = data[pageName];
    validateItems(items, pageName);

    const template = await readFile(
      resolve(templatesDirectory, `${pageName}.html`),
      "utf8",
    );
    if (template.split(itemsPlaceholder).length !== 2) {
      throw new Error(
        `${pageName}.html must contain exactly one ${itemsPlaceholder} placeholder`,
      );
    }

    await writeFile(
      resolve(publicDirectory, `${pageName}.html`),
      template.replace(itemsPlaceholder, renderItems(items, pageName)),
    );
  }),
);

console.log(`Built ${pageNames.length} pages from scripts/data/site.json`);
