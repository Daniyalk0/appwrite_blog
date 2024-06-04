import React, { useEffect, useState } from "react";
import Container from "./Container";
import { useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import { Query } from "appwrite";
import parse from "html-react-parser";
import PostCard from "./PostCard";
import { FaUser } from "react-icons/fa6";
import { DNA } from "react-loader-spinner";

function Usercard({user}) {
  const { slug } = useParams();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);

  const query = [Query.equal("author", slug)];

  useEffect(() => {
    service.getPosts(query).then((post) => {
      if (post) {
        setPosts(post.documents);
        setLoading(false);
      } else {
        console.log("no posts in userCard");
      }
    });
  }, [query, slug]);

  console.log("possts", posts);

  return (
    <Container>
      <div className="w-full h-full py-[20px]  text-black  relative  flex justify-center items-center flex-col">
        <div className="w-full h-full flex justify-center items-center flex-col mt-[80px]">
          {!loading && (
            <div className="w-full flex justify-left   items-center pl-[10px]">
              <FaUser className="w-[50px] h-[60px] tablet:w-[30px] tablet:h-[30px] mobile:h-[25px] mobile:w-[25px] text-zinc-800 dark:text-zinc-300" />

              <div className="ml-[10px]">
                <p className="underline  text-gray-900 dark:text-white text-[15px] font-semibold tracking-wider  uppercase mobile:text-[12px]">
                  {slug}
                </p>
                <p className="underline  text-gray-900 dark:text-white text-[15px] font-semibold tracking-wider  uppercase mobile:text-[12px] ">
                  Posts: {posts?.length}
                </p>
                {posts.some((post) => post.email) && (
                  <p className="underline text-gray-900 dark:text-white text-[15px] font-semibold tracking-wider uppercase mobile:text-[12px]">
                    {posts.find((post) => post.email).email}
                  </p>
                )}
              </div>
            </div>
          )}

          {!loading && (
            <h1 className="text-center text-2xl text-zinc-800 dark:text-white">
              Posts
            </h1>
          )}
          {loading ? (
            <div className="w-full h-[80vh] flex justify-center items-center">
              {" "}
              <div className="mobile:hidden absolute z-50">
                <DNA
                  visible={true}
                  height="100"
                  width="100"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
              <div className="mobile:block hidden absolute">
                <DNA
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  wrapperClass="dna-wrapper"
                />
              </div>
              <h1 className="text-zinc-700 dark:text-white content text-4xl">
                Loading Posts...
              </h1>
            </div>
          ) : !posts && !loading ? (
            <h1 className="bg-red-600 text-center mt-[15vw] p-3 dark:text-white">
              No posts to show
            </h1>
          ) : (
            posts.map((post, index) => (
              <div className="flex flex-col justify-center items-center">
                <PostCard {...post} className="mb-[20px]"></PostCard>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
}

export default Usercard;
