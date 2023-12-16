import React from "react";
import PostsListModal from "../PostsListModal";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";
import classes from "./Styles.module.css";
import { Slash } from "lucide-react";
import { ThemeContext } from "../ThemeProvider";



function PostsNavigation({ setOpen, open }) {
  const {  container } = React.useContext(ThemeContext);
  const { postOnDisplay, setPostOnDisplay, posts, wordsSelected } =
    React.useContext<FeedState>(FeedContext);

  const getTotalWords = React.useCallback(() => {
    let total = 0;
    if (Object.keys(wordsSelected).length === 0) return

    Object.keys(wordsSelected).forEach(key => {
      Object.keys(wordsSelected[key]).forEach(line => total += wordsSelected[key][line].length)
    });
    return total
  }, [wordsSelected])

  const [totalWordsSelected, setTotalWordsSelected] = React.useState(() => getTotalWords())

  React.useEffect(() => {
    setTotalWordsSelected(getTotalWords());
  }, [wordsSelected, getTotalWords])



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
    const arrWords = []

    if (Object.keys(wordsSelected).length === 0) return

    Object.entries(wordsSelected).forEach(key => {
      const post = posts.find(post => post.id == key[0])
      Object.keys(key[1]).forEach(line => {
        const words = post.korSplit[line].split(' ');
        const id = `${key[0]}-${line}`;
        key[1][line].forEach(wordIndex => {
          arrWords.push([id, words[wordIndex]])
        });

      })
    });

    console.log({ arrWords })
    // TODO EXPORT AS CSV
  };





  // console.log(totalWordsSelected)

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
          <button onClick={exportWordsSelected}>export {totalWordsSelected} words selected</button>
        </div>

        <button onClick={nextPost}>next</button>
      </nav>
    </footer>
  );
}

export default PostsNavigation;
