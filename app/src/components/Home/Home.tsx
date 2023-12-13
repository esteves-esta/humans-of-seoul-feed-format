import React from 'react';
import { FeedContext } from '../FeedProvider'

import FeedState from '../../interfaces/feedState';
import Post from '../Post';
import Header from '../Header';
import PostsNavigation from '../PostsNavigation';

function Home() {

  const { postOnDisplay } = React.useContext<FeedState>(FeedContext)
  return <main>

    <Header />

    {postOnDisplay && <Post />}


    <PostsNavigation />
  </main>;
}

export default Home;
