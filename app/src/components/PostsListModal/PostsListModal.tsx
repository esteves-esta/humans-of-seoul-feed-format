import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import classes from "./Styles.module.css";
import { FeedContext } from "../FeedProvider";
import FeedState from "../../interfaces/feedState";
import { X } from "lucide-react";

function PostsListModal({ open, setOpen, container }) {
  const { posts, setPostOnDisplay, postOnDisplay } =
    React.useContext<FeedState>(FeedContext);

  function goToPost(index) {
    setPostOnDisplay(posts[index]);
    setOpen(false);
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal container={container}>
        <Dialog.Overlay className={classes.DialogOverlay} />
        <Dialog.Content className={classes.DialogContent}>
          <ul>
            {posts.map((post, index) => (
              <li key={post.id}>
                <button
                  onClick={() => goToPost(index)}
                  autoFocus={postOnDisplay?.id === post.id}
                >
                  {post.kor.slice(0, 40)} ...
                </button>
              </li>
            ))}
          </ul>
          <Dialog.Close asChild>
            <button
              className={`${classes.CloseButton} IconButton`}
              aria-label="Close"
            >
              <X />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default PostsListModal;
