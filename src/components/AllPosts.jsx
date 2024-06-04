import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PostCard from "./PostCard";
import Container from "./Container";
import { NavLink, useParams } from "react-router-dom";


function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setdate] = useState({day: '', month: '', year: ''})
    
    // console.log('post', posts);

  
  const allposts = async () => {
    const postsData = await useSelector((state) => state.posts.postsData);
    if (postsData) {
      setPosts(postsData);
    } else {
      console.log('no posts in allposts!!');
    }
  };
  allposts();

  useEffect(() => {
    // Simulate loading delay with setTimeout
    const timeout = setTimeout(() => {
      setLoading(true);
    }, 2000); // Change 2000 to your desired loading time in milliseconds

    return () => clearTimeout(timeout);
  }, []);


  
  return (
    <Container className="">
      <div
        className={`  w-full h-auto py-[50px]  flex justify-center items-center mt-[80px] relative min-h-screen  `}
      >
  

        {posts.length ? (
          <div className=" w-full h-full flex justify-center gap-[3vw] tablet:gap-[7vw] flex-col-reverse  flex-wrap items-center mx-[20px] px-[10px mobile:mt-[40px]">
            {posts.map((post, index) => (
              
              <PostCard 
                {...post}
              ></PostCard>
            ))}
          </div>
        ) : (
          <h1 className="bg-red-600 text-center mt-[15vw] p-3 dark:text-white">
            No posts to show
          </h1>
        )}
      </div>
    </Container>
  );
}

export default AllPosts;
