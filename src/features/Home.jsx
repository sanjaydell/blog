import React, { useEffect, useState } from 'react'
import { collection, getDocs } from "firebase/firestore";
import Box from '@mui/material/Box';

import { db } from '../firebase';
import { BlogCard } from '../components/BlogCard';
import { Header } from '../components/Header';


export const Home = (props) => {
  const { setUser } = props;
  const [posts, setPosts] = useState([]);
  const postCollectionRef = collection(db, "posts");
  const [updatedPosts, setUpdatedPosts] = useState(false);
  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPosts(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    }
    getPosts();
    setUpdatedPosts(false);
  }, [updatedPosts]);


  return (
    <>
      <Header setUser={setUser} setUpdatedPosts={setUpdatedPosts} />
      <Box width="70%" justifyContent="center" margin="auto" paddingTop="2rem" height="90vh" marginTop="10vh">
        {posts.map((post) => 
          <BlogCard post={post} />
        )}
      </Box>
    </>
  )
}
