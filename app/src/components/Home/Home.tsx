import React from 'react';
import { FeedContext } from '../FeedProvider'

import FeedState from '../../interfaces/feedState';
import Post from '../Post';
import Header from '../Header';
import PostsNavigation from '../PostsNavigation';
import { ThemeContext } from '../ThemeProvider';

function Home() {
  const { color, fontSize, wordSpacing,fontWeight, lineHeight, font } = React.useContext(ThemeContext)

  const { postOnDisplay } = React.useContext<FeedState>(FeedContext)
  return <main className={color}

    style={{
      '--font-family': font,
      '--font-weight': fontWeight,
      '--font-size': fontSize + 'rem',
      '--line-height': lineHeight + 'em',
      '--word-spacing': wordSpacing + 'em',
    } as React.CSSProperties}>
    <Header />

    {postOnDisplay && <Post />}


    <PostsNavigation />
  </main>;
}

export default Home;
