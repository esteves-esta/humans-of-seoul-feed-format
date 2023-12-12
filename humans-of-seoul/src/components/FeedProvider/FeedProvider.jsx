import React from 'react';
import useSWR from "swr";
// import { ToastContext } from "../ToastProvider";

// const FEED_URL = "https://humansofseoul.com/rss";
const FEED_URL = "http://localhost:3001/";

// const localStorageKey = 'feed-content'

/* 
https://developer.mozilla.org/en-US/docs/Web/XML/Parsing_and_serializing_XML
https://css-tricks.com/how-to-fetch-and-parse-rss-feeds-in-javascript/
https://thewebdev.info/2021/02/13/create-an-rss-reader-with-react-and-javascript/
https://humansofseoul.com/rss
*/

async function fetcher() {
  const response = await fetch(`${FEED_URL}`, {
    method: "GET",
  });

  const json = await response.json();
  if (json.error && json.error?.code === 800)
    throw new Error(json.error.message);
  return json;
}

const errorRetry = (error, key, config, revalidate, { retryCount }) => {
  // Never retry on 404.
  if (error.status === 404) return;

  if (retryCount >= 2) return;

  // Retry after 5 seconds.
  setTimeout(() => revalidate({ retryCount }), 5000);
};


export const FeedContext = React.createContext();

function FeedProvider({ children }) {

  const { data, error, isLoading } = useSWR(fetcher, { errorRetry });

  const state = { data, error, isLoading }

  return <FeedContext.Provider value={state}>
    {children}
  </FeedContext.Provider>;
}

export default FeedProvider;
