import { useState, useEffect } from 'react'
import {
  HeartIcon,
  ChatIcon,
  PaperAirplaneIcon,
  EmojiHappyIcon,
} from '@heroicons/react/outline'
import { HeartIcon as HeartIconFilled } from '@heroicons/react/solid'

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@firebase/firestore'

import { useSession } from 'next-auth/react'
import { db } from '../firebase'

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession()
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [likes, setLikes] = useState([])
  const [hasLiked, setHasLiked] = useState(false)

  // useEffect(() => {
  //   return onSnapshot(
  //     query(
  //       collection(db, 'posts', id, 'comments'),
  //       orderBy('timestamp', 'desc')
  //     ),
  //     (snapshot) => {
  //       setComments(snapshot.docs)
  //     }
  //   )
  // }, [db, id])

  // const sendComment = async (e) => {
  //   e.preventDefault()

  //   const commentToSend = comment
  //   setComment('')

  //   await addDoc(collection(db, 'posts', id, 'comments'), {
  //     comment: commentToSend,
  //     username: session.user.username,
  //     userImage: session.user.image,
  //     timestamp: serverTimestamp(),
  //   })
  // }

  useEffect(
    () =>
      onSnapshot(collection(db, 'posts', id, 'likes'), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  )

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    )
  }, [likes])

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, 'posts', id, 'likes', session.user.uid))
    } else {
      await setDoc(doc(db, 'posts', id, 'likes', session.user.uid), {
        username: session.user.username,
      })
    }
  }

  return (
    <div>
      {/* image */}

      <img src={img} alt="" className="aspect" />

      {/* header */}
      <div className="flex items-center justify-between p-4">
        {/* user */}
        <div className="flex items-center">
          <img
            src={userImg}
            alt=""
            className="w-8 h-8 rounded-full p-[1.5px] cursor-pointer border-2 border-red-500 object-cover"
          />
          <div className="ml-2">
            <p className="font-bold text-sm">{username}</p>
            <p className="text-xs text-gray-400 truncate">{caption}</p>
          </div>
        </div>
        {/* buttons */}
        {session && (
          <div className="flex items-center space-x-2">
            {likes.length > 0 && (
              <p className="font-semibold text-xs">{likes.length} likes</p>
            )}

            {hasLiked ? (
              <HeartIconFilled
                onClick={likePost}
                className="icons_sm text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="icons_sm" />
            )}
            <ChatIcon className="icons_sm" />
          </div>
        )}
      </div>

      {/* Comments */}
      {/* {comments.length > 0 && (
        <div className="ml-10 h-15 overflow-y-scroll scrollbar-track-gray-dark scrollbar-thin">
          {comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <p className="text-sm flex-1">
                <span className="font-bold">{comment.data().username} </span>
                {comment.data().comment}
              </p>
              <Moment className="text-xs pr-5" fromNow>
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )} */}

      {/* {session && (
        <form className="flex items-center px-4">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="text-sm border-0 flex-1 focus:ring-0 outline-none"
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="text-sm text-red-400 font-semibold"
          >
            Post
          </button>
        </form>
      )} */}
    </div>
  )
}

export default Post
