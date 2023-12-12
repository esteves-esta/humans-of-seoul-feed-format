import React from 'react';
import { FeedContext } from '../FeedProvider'

function Home() {
  const { data } = React.useContext(FeedContext)

  return <div>
    <h1>Vite + React</h1>
    {data && data.length}
  </div>;
}

export default Home;
