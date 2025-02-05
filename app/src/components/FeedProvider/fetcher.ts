import { franc } from "franc";

// const FEED_URL = "https://humansofseoul.com/rss";
const FEED_URL =
  "https://api.allorigins.win/get?url=https://humansofseoul.com/rss";
// const FEED_URL = "http://localhost:3001/";

export async function fetcher(teste) {
  console.log(teste);
  try {
    const response = await fetch(FEED_URL, {
      method: "GET"
    });

    const json = await response.json();
    console.log({ json });
    const dataXML = new DOMParser().parseFromString(json.contents, "text/xml");
    const itemsHTML = dataXML.querySelectorAll("item");
    const posts = parseDOM2JSON(itemsHTML);

    return { posts };
  } catch (e) {
    console.error(e);
    return {};
  }
}

function parseDOM2JSON(items) {
  const posts = [];
  items.forEach((el) => {
    const descriptionTag = el.querySelector("description");

    // from: https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js
    const tempDOM = document.createElement("html");
    tempDOM.innerHTML = `<body>${descriptionTag.textContent}</body>`;
    const paragraphs = tempDOM.querySelectorAll("p");

    const tempDOM2 = document.createElement("html");
    tempDOM2.innerHTML = `<head><meta charset="UTF-8" /></head><body>${
      el.querySelector("title")?.textContent
    }</body>`;

    const parseParagraphs = [];
    paragraphs.forEach((p) => {
      let content = p.innerHTML;
      content = content.replace(/<a.+a\/>$/gi, "");
      content = content.replace(/<br>/gi, "");
      parseParagraphs.push(content.split("“"));
    });

    if (parseParagraphs.length === 0) return;
    parseParagraphs.forEach((p) => {
      const korean = [];
      const english = [];

      p.forEach((item: string) => {
        if (item.trimEnd().trimStart() === "") return;
        const result = franc(item);
        // console.log({ result, item });
        if (!result) return;
        if (result === "und") return;
        if (result === "kor") korean.push(item);
        if (result !== "kor") english.push(item);
      });

      if (korean.length === 0 || english.length === 0) return;

      posts.push({
        title: tempDOM2?.textContent || "",
        link: el.querySelector("link")?.innerHTML || "",
        id:
          el.querySelector("link")?.innerHTML.replace(/\D/g, "") ||
          crypto.randomUUID(),
        pubDate: el.querySelector("pubDate")?.innerHTML || "",
        kor: korean.join(" "),
        eng: english.join(" "),
        korSplit: splitParagraphsMore(korean),
        engSplit: splitParagraphsMore(english),
        selectedWords: []
      });
    });
  });

  return posts;
}

function splitParagraphsMore(p: string[]) {
  const splitted = [];
  p.forEach((i) => {
    const t = i.split(". ");
    splitted.push(...t);
  });
  return splitted;
}

export const errorRetry = (error, revalidate, { retryCount }) => {
  // Never retry on 404.
  if (error.status === 404) return;

  if (retryCount >= 2) return;

  // Retry after 5 seconds.
  setTimeout(() => revalidate({ retryCount }), 5000);
};
