import React from 'react';
import PostsListModal from '../PostsListModal';
import { FeedContext } from '../FeedProvider'
import FeedState from '../../interfaces/feedState';
import classes from './Styles.module.css'

function PostsNavigation() {
  const { postOnDisplay, setPostOnDisplay, posts, wordsSelected } = React.useContext<FeedState>(FeedContext)
  const [open, setOpen] = React.useState(false)

  const previousPost = () => {
    let currentIndex = posts.findIndex(post => post.id === postOnDisplay.id)
    currentIndex -= 1
    if (currentIndex === 0) currentIndex = posts.length - 1
    setPostOnDisplay(posts[currentIndex])
  }

  const nextPost = () => {
    let currentIndex = posts.findIndex(post => post.id === postOnDisplay.id)
    currentIndex += 1
    if (currentIndex === posts.length) currentIndex = 0
    setPostOnDisplay(posts[currentIndex])
  }

  const exportWordsSelected = () => {
    console.log(wordsSelected)
  }


  return <footer>
    <PostsListModal open={open} setOpen={setOpen} />
    <nav>
      <button onClick={previousPost}>
        previous
      </button>

      <button onClick={() => setOpen(true)}>
        see all {posts.length} posts
      </button>
      <button onClick={exportWordsSelected}>
        export
      </button>

      <button onClick={nextPost}>
        next
      </button>
    </nav>
  </footer>;
}

export default PostsNavigation;
