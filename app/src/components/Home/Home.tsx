import React from 'react';
import { FeedContext } from '../FeedProvider'
import { Slash } from 'lucide-react'
import FeedState from '../../interfaces/feedState';
import Post from '../Post';

/* https://proxy-bewq.onrender.com/ */
function Home() {
  const { postOnDisplay, setPostOnDisplay, posts, wordsSelected } = React.useContext<FeedState>(FeedContext)

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

  return <main>
    <header>
      <h1>휴먼스 오브 서울 <Slash />Humans of seoul </h1>
    </header>

    <button onClick={exportWordsSelected}>
      export
    </button>
    <button onClick={previousPost}>
      previous
    </button>
    <button onClick={nextPost}>
      next
    </button>

    {postOnDisplay && <Post />}

  </main>;
}

export default Home;
