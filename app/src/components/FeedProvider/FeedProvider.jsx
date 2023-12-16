import React from "react";
import useSWR from "swr";
import { fetcher, errorRetry } from "./fetcher";
import useStickyState from "../../hooks/useStickyState";

export const FeedContext = React.createContext();

function FeedProvider({ children }) {
  const { data, error, isLoading } = useSWR("testes", fetcher, {
    errorRetry,
    revalidateOnFocus: false
  });

  const [postOnDisplay, setPostOnDisplay] = React.useState(null);
  const [wordsSelected, setWordsSelected] = useStickyState(
    {},
    "hos-word-selected"
  );
  const [posts, setPosts] = useStickyState([], "hos-feed-posts");

  React.useEffect(() => {
    if (data?.posts && data.posts.length > 0) {
      setPostOnDisplay(data.posts[0]);
      setPosts(data.posts);
    }
  }, [data, setPosts]);

  React.useEffect(() => {
    if (posts && posts.length > 0) {
      setPostOnDisplay(posts[0]);
    }
  }, [posts]);

  const state = {
    posts,
    error,
    isLoading,
    postOnDisplay,
    setPostOnDisplay,
    setWordsSelected,
    wordsSelected
  };
  return <FeedContext.Provider value={state}>{children}</FeedContext.Provider>;
}

export default FeedProvider;
