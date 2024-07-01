import React, { useEffect, useState } from "react";
import Container from "./Container";
import { NavLink, useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import { Query } from "appwrite";
import { DNA } from "react-loader-spinner";
import image from "../images/userCardBg.jpg";
import { FaCircleUser } from "react-icons/fa6";

function Usercard({ user }) {
  const { slug } = useParams();
  const [posts, setPosts] = useState();
  const [loading, setLoading] = useState(true);
  const [gotDP, setGotDP] = useState(null);

  const query = [Query.equal("author", slug)];

  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false)
    }, 1500);
  }, []);

  useEffect(() => {
    service.getPosts(query).then((post) => {
      if (post) {
        setPosts(post.documents);
        if (post.documents[0].DPid) {
          setGotDP(post.documents[0].DPid);
        } else {
          console.log("noDPid");
        }
        // setLoading(false);
      } else {
        console.log("no posts in userCard");
      }
    });
  }, [query, slug]);
  // console.log(posts[0].author);

  return (
    <Container>
      <div className=" min-h-[650px] w-full mt-[80px] mobile:mt-[75px]">
        <div className="h-[200px] w-full relative z-[1]">
          <img
            src={image}
            alt="f"
            className="h-full object-cover w-full center center/cover"
          />
        </div>
        <div className=" flex flex-col justify-center items-center leading-3 relative z-[10] translate-y-[-30px]">
          {" "}
          {gotDP ? (
            <img
              src={service.getDPPreview(gotDP)}
              className={`h-[50px] w-[50px]   rounded-3xl mt-[5px]   cursor-pointer mb-[7px] border-[1px] border-zinc-300`}
            />
          ) : (
            <FaCircleUser className="w-[50px] h-[50px] text-zinc-300 mb-[7px]" />
          )}
          <h1 className="text-zinc-200">{posts && posts[0].author}</h1>
          {posts?.some((post) => post.email) && (
            <p className="underline text-zinc-300 text-[10px]">
              {posts.find((post) => post.email).email}
            </p>
          )}
        </div>
        <div className="w-full tablet:mt-[120px] flex flex-col items-center max-h-[450px] overflow-y-auto p-2 mt-[50px] ">
          <h1 className="text-center border-b-2 border-zinc-800 dark:border-zinc-400 text-zinc-800 dark:text-zinc-400 content text-3xl">
            Posts
          </h1>
          <div className=" w-[100%]  flex flex-wrap gap-[7px] h-full justify-center items-center mt-[40px]">
            {posts?.map((post) => (
              <NavLink to={`/post/${post.$id}`}>
                <img
                  className="w-[200px] h-[200px] bg-red-300 mobile:w-[100px] mobile:h-[100px] cursor-pointer hover:rounded-xl transition-all duration-200 hover:shadow-lg "
                  src={service.getFilePreview(post.imageId)}
                />
              </NavLink>
            ))}
          </div>
      {loading && (
        <>
        <div className="absolute inset-0 bg-black opacity-90 w-screen top-[-50%] z-[10] mobile:h-screen mobile:top-0" />
          {" "}
          <div className="mobile:hidden absolute z-50 top-[30%]">
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
          <div className="mobile:block hidden absolute z-50 top-[45%] ">
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </>
      )}
        </div>
      </div>
    </Container>
  );
}

export default Usercard;
