import React from "react";
import PostsListModal from "../PostsListModal";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";
import classes from "./Styles.module.css";
import { Slash } from "lucide-react";

function PostsNavigation({ container, setOpen, open }) {
  const { postOnDisplay, setPostOnDisplay, posts, wordsSelected } =
    React.useContext<FeedState>(FeedContext);

  const previousPost = () => {
    let currentIndex = posts.findIndex((post) => post.id === postOnDisplay.id);

    currentIndex -= 1;

    if (currentIndex < 0) currentIndex = posts.length - 1;

    setPostOnDisplay(posts[currentIndex]);
  };

  const nextPost = () => {
    let currentIndex = posts.findIndex((post) => post.id === postOnDisplay.id);
    currentIndex += 1;
    if (currentIndex === posts.length) currentIndex = 0;
    setPostOnDisplay(posts[currentIndex]);
  };

  const exportWordsSelected = () => {
    console.log(wordsSelected);
  };

  return (
    <footer className={classes.Footer}>
      <PostsListModal container={container} open={open} setOpen={setOpen} />

      <nav>
        <button onClick={previousPost}>previous</button>

        <div className={classes.CenterBtn}>
          <button onClick={() => setOpen(true)}>
            see all {posts.length} posts
          </button>
          <Slash size={15} />
          <button onClick={exportWordsSelected}>export</button>
        </div>

        <button onClick={nextPost}>next</button>
      </nav>
    </footer>
  );
}

export default PostsNavigation;
