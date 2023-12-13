import React from 'react';
import { FeedContext } from '../FeedProvider'

function Home() {
  const { data } = React.useContext(FeedContext)

  return <div>
    <h1>oi</h1>
    <p>
      {data?.posts && data.posts?.length}
    </p>
    {/* {data?.posts && data.posts} */}
  </div>;
}

export default Home;
