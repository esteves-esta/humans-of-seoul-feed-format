import React from 'react';
import { FeedContext } from '../FeedProvider'

import FeedState from '../../interfaces/feedState';
import Post from '../Post';
import Header from '../Header';
import PostsNavigation from '../PostsNavigation';
import { ThemeContext } from '../ThemeProvider';

function Home() {
  const { color } = React.useContext(ThemeContext)

  const { postOnDisplay } = React.useContext<FeedState>(FeedContext)
  return <main className={color}>
    <Header />

    {postOnDisplay && <Post />}


    <PostsNavigation />
  </main>;
}

export default Home;
