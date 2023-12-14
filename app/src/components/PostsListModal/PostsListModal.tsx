import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import classes from "./Styles.module.css";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";

function PostsListModal({ open, setOpen }) {
  const { posts } = React.useContext<FeedState>(FeedContext);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content className={classes.DialogContent}>
          {/* <Dialog.Title className={classes.DialogTitle}>
            Edit profile
          </Dialog.Title> */}
          {/* <Dialog.Description className={classes.DialogDescription}>
            List of posts
          </Dialog.Description> */}
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                {post.pubDate} -{post.kor}
              </li>
            ))}
          </ul>
          <Dialog.Close asChild>
            <button className={classes.IconButton} aria-label="Close">
              x
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default PostsListModal;
