// const FEED_URL = "https://proxy-bewq.onrender.com/";
const FEED_URL = "http://localhost:3001/";

/* 
https://developer.mozilla.org/en-US/docs/Web/XML/Parsing_and_serializing_XML
https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
https://thewebdev.info/2021/02/13/create-an-rss-reader-with-react-and-javascript/
https://humansofseoul.com/rss

https://allorigins.win/
*/

export async function fetcher(teste) {
  console.log(teste);
  const response = await fetch(FEED_URL, {
    method: "GET"
  });
  const text = await response.text();
  const dataXML = new DOMParser().parseFromString(text, "text/xml");

  const itemsHTML = dataXML.querySelectorAll("item");
  const posts = parseDOM2JSON(itemsHTML);
  posts.map((item) => {
    item.korSplit = item.kor.split(". ");
    item.engSplit = item.eng
      .replace(/([a-zA-Z]{1})\.([a-zA-Z]{1})\./g, "$1$2")
      .split(". ");
  });
  // console.log(posts)
  return { posts };
}

function parseDOM2JSON(items) {
  const posts = [];
  items.forEach((el) => {
    const descriptionTag = el.querySelector("description");

    // from: https://stackoverflow.com/questions/10585029/parse-an-html-string-with-js
    const tempDOM = document.createElement("html");
    tempDOM.innerHTML = `<body>${descriptionTag.textContent}</body>`;

    const paragraphs = tempDOM.querySelectorAll("p");
    let indexKor = 0;
    let indexEng = 1;

    if (paragraphs.length > 2) {
      if (paragraphs[0].childNodes[0].nodeName === "BR") {
        indexKor = 1;
        indexEng = 2;
        if (
          paragraphs[2].childNodes[0].textContent.includes("Humans of Seoul")
        ) {
          indexEng = 3;
        }
      }
      if (paragraphs[1].childNodes[0].textContent.includes("Humans of Seoul")) {
        indexEng = 2;
      }
    }
    const tempDOM2 = document.createElement("html");
    tempDOM2.innerHTML = `<head><meta charset="UTF-8" /></head><body>${
      el.querySelector("title")?.textContent
    }</body>`;

    if (
      !paragraphs[indexKor]?.textContent.includes("Humans of Seoul") &&
      !paragraphs[indexEng]?.textContent.includes("Humans of Seoul")
    ) {
      posts.push({
        title: tempDOM2?.textContent || "",
        link: el.querySelector("link")?.innerHTML || "",
        id:
          el.querySelector("link")?.innerHTML.replace(/\D/g, "") ||
          crypto.randomUUID(),
        pubDate: el.querySelector("pubDate")?.innerHTML || "",
        kor: paragraphs[indexKor]?.textContent,
        eng: paragraphs[indexEng]?.textContent,
        selectedWords: []
      });
    } /* else {
      console.log(indexKor);
      console.log(paragraphs[indexKor]?.textContent);
      console.log(indexEng);
      console.log(paragraphs[indexEng]?.textContent);
      console.log("ooo");
    } */
  });
  return posts;
}

export const errorRetry = (error, key, config, revalidate, { retryCount }) => {
  // Never retry on 404.
  if (error.status === 404) return;

  if (retryCount >= 2) return;

  // Retry after 5 seconds.
  setTimeout(() => revalidate({ retryCount }), 5000);
};
