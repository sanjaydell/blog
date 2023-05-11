import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import { db } from '../firebase';


export const Home = () => {
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "posts");
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      console.log('1111111111111111122222222222', data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getPosts();
  }, []);

  return (
    <>
    {posts.map((post) => 
      <div><h1>{post.title}</h1><h6>{post.content}</h6></div>
    )}
    </>
  )
}
