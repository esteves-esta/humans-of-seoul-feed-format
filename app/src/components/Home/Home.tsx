import React from "react";
import { FeedContext } from "../FeedProvider";

import FeedState from "../../interfaces/feedState";
import Post from "../Post";
import Header from "../Header";
import PostsNavigation from "../PostsNavigation";
import { ThemeContext } from "../ThemeProvider";

function Home() {
  const { color } = React.useContext(ThemeContext);
  const [container, setContainer] = React.useState(null);
  const { postOnDisplay } = React.useContext<FeedState>(FeedContext);
  const [openPostsList, setOpenList] = React.useState(false);
  return (
    <main className={color} ref={setContainer}>
      <div
        style={{
          filter: openPostsList ? "blur(3px)" : "blur(0px)"
        }}
      >
        <Header />

        {postOnDisplay && <Post />}
      </div>

      <PostsNavigation
        setOpen={setOpenList}
        open={openPostsList}
        container={container}
      />
    </main>
  );
}

export default Home;
