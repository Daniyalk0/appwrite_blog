import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import service from "../own_appwrite/Config";
import { useNavigate } from "react-router-dom";
import PostCard from "./PostCard";
import Container from "./Container";
import { NavLink } from "react-router-dom";
import GlobalBtn from "./GlobalBtn";

function YourPosts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const postsData = useSelector((state) => state.posts.postsData);
  const userData = useSelector((state) => state.auth.userData);

  const date = new Date(posts[0]?.$createdAt);
  const month = date.toLocaleDateString(undefined, { month: 'long' });
  const formattedDate = date.toLocaleDateString();
  const year = date.getFullYear()
  const day = date.getUTCDate()


  useEffect(() => {
    const isAuthor = postsData.filter((post) => post.userId === userData.$id);

    setPosts(isAuthor);
  }, [postsData]);

  return (
    <Container className="">
      <div className={` w-full h-auto py-[50px]  flex flex-col justify-center items-center mt-[80px] relative min-h-screen  `}>
      <img
          src="https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg"
          alt="authimage"
          className="w-full h-full brightness-75 absolute top-0 z-[-1]"
        />
        {posts.length ? (
            <div className="w-full h-full flex justify-center gap-[5vw] tablet:gap-[7vw] flex-wrap items-center  mobile:mt-[10px]  mobile:mb-[30px]">
            {posts.map((post) => (
              <PostCard {...post} key={post.id} year={year} month={month} day={day} />
            ))}
          </div>
        ) : (
          <h1 className="bg-red-600 text-center mt-[12vw] p-3 text-white dark:text-zinc-900 ">
            No posts to show
          </h1>
        )}
      </div>
    </Container>
  );
}

export default YourPosts;
