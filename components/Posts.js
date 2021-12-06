import { useState, useEffect } from 'react'
import Post from './Post'
import { db } from '../firebase'
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore'

function Posts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    return onSnapshot(
      query(collection(db, 'posts'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setPosts(snapshot.docs)
      }
    )
  }, [db])

  return (
    <div className="grid sm:grid-cols-2 gap-3 mt-2">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.data().username}
          userImg={post.data().profileImg}
          img={post.data().image}
          caption={post.data().caption}
        />
      ))}
    </div>
  )
}

export default Posts
