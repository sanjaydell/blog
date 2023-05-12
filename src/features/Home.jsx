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
      <Header setUser={setUser} />
      <Box width="70%" justifyContent="center" margin="auto" paddingTop="2rem" height="90vh" marginTop="10vh">
        {posts.map((post) => 
          <BlogCard post={post} />
        )}
      </Box>
    </>
  )
}
