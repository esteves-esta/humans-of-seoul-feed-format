import React from "react";
import FeedState from "../../interfaces/feedState";
import { FeedContext } from "../FeedProvider";
import classes from "./Post.module.css";
import { ThemeContext } from "../ThemeProvider";
// import { formatDate } from "../../helper/format";
import ParagraphLine from "./ParagraphLine";

function Post({ container }) {
  const { postOnDisplay } = React.useContext<FeedState>(FeedContext);

  const { korSplit, kor, engSplit, id } = postOnDisplay;

  const { fontSize, wordSpacing, fontWeight, lineHeight, font } =
    React.useContext(ThemeContext);

  const translationRef = React.useRef(null);

  const onEscPress = (event) => {
    if (event.code === "Escape") {
      translationRef.current.firstChild.focus();
    }
  };

  return (
    <article
      className={classes.postContainer}
      style={
        {
          "--font-family": font,
          "--font-weight": fontWeight,
          "--font-size": fontSize + "em",
          "--line-height": lineHeight + "em",
          "--word-spacing": wordSpacing + "em"
        } as React.CSSProperties
      }
    >
      {/* <h3>{formatDate(pubDate)}</h3> */}
      <section>
        <div>
          <ParagraphLine
            id={id}
            value={korSplit}
            hasWordSelection={true}
            onWordPress={onEscPress}
          />
          <p className={classes.wordCount}>{kor.split(" ").length} words</p>
        </div>

        <ParagraphLine
          ref={translationRef}
          className={classes.translation}
          id={id}
          hasVisibilityToogle={true}
          value={engSplit}
        />
      </section>
    </article>
  );
}

export default Post;
