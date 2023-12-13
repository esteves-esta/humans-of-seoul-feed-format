import React from 'react';
import { FeedContext } from '../FeedProvider'

/* https://proxy-bewq.onrender.com/ */
function Home() {
  const { data } = React.useContext(FeedContext)
  const [teste, setTeste] = React.useState(null)
  const [visible, setVisible] = React.useState([])

  React.useEffect(() => {
    if (data?.posts) setTeste(data.posts[0])
  }, [data])

  return <div>
    <h1>oi</h1>
    <p>
      {data?.posts && data.posts?.length}
    </p>

    {teste && <> <h3>{teste.title}</h3>
      <div style={{ columns: 2 }}>
        <ul>
          {teste.korSplit.map((string, index) => {
            return (<li key={index}>
              {string.split(' ').map(word => <React.Fragment key={`${word}${crypto.randomUUID()}`}><span style={{ background: '#efefef', marginRight: '10px' }}>
                {word}{" "}
              </span></React.Fragment>)}
            </li>)
          })}
        </ul>

        <ul>
          {teste.engSplit.map((string, index) =>
            <li key={index} onClick={() => {
              if (visible.includes(index)) {
                setVisible([...visible.filter(i => i !== index)])
                return
              }
              setVisible([...visible, index])
            }}>{visible.includes(index) ? string : '-'}</li>

          )}
        </ul>
      </div></>}

  </div>;
}

export default Home;

/* 

   {data?.posts && data.posts.map(post => (<div key={post.link}>
        <ul>
          <li>title: {post.title}</li>
          <li>kor: {post.kor}</li>
          <li>eng: {post.eng}</li> 
<li>korSplit: {post.korSplit.length}</li>
 <li>korSplit: {post.korSplit.join("/")}</li> 
<li>engSplit: {post.engSplit.length}</li>
 <li>engSplit: {post.engSplit.join("/")}</li> 
        </ul >
  <hr />
        </div >
      ))} 
      
*/