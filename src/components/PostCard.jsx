import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { NavLink, useLocation } from "react-router-dom";
import service from "../own_appwrite/Config";
import Loading from "./Loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function PostCard({
  title = "",
  content = "avnfgngidfgfdg",
  imageId,
  className,
  $id,
  date,
  children,
  author,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [width, setWidth] = useState(false);
  const [fullwidth, setFullWidth] = useState(false);
  const location = useLocation();

  const datee = new Date(date);

  const month = datee.toLocaleDateString(undefined, { month: "long" });
  const year = datee.getFullYear();
  const day = datee.getUTCDate();


  useEffect(() => {
    if (content.length > 30) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  }, []);

  const widthOfText = () => {
    setFullWidth((prev) => !prev);
  };

  return (
    <>
      <div
        className={`${className}  gap-3 bg-zinc-100 dark:bg-postcard shadow-md shadow-darkgreen  dark:shadow-xl dark:shadow-zinc-100 flex flex-col p-1 justify-start  text-white rounded-2xl w-[25vw] relative min-w-[300px] max-w-[400px] max-h-[400px] transition-all duration-200 hover:shadow-lg hover:shadow-zinc-300 gsapp`}
        {...props}
      >
        {location.pathname === "/allPosts" ? (
          <p className="pl-[5px] underline dark:text-green-800 text-green-900 text-[10px] font-semibold tracking-widest uppercase">
            {author}
          </p>
        ) : (
          ""
        )}
        <NavLink to={`/post/${$id}`} >
          <img
            src={`${service.getFilePreview(imageId)}`}
            alt="image"
            className=" rounded-lg w-full h-[40vh] max-h-[270px]"
          />
        </NavLink>
        <div className="w-full ">
          {children}
          <div className="flex ">
            <h1 className="text-[25px] w-full break-words text-darkgreen dark:text-white">
              {title}
            </h1>
          </div>
          <div className="w-full ">
            <p
              className={`text-[10px] text-darkgreen dark:text-white w-full  ${
                width ? "overflow-hidden" : ""
              } ${fullwidth ? "overflow-visible break-words" : ""}`}
            >
              {parse(content)}
              {width ? (
                <p
                  className="text-zinc-500 dark:text-zinc-400 cursor-pointer absolute"
                  onClick={widthOfText}
                >
                  {fullwidth ? "hide..." : "more..."}
                </p>
              ) : (
                ""
              )}
            </p>
          </div>
          <div className="w-full flex justify-end [10px] mt-[20px]">
            <p className="text-[10px]  text-zinc-500 dark:text-zinc-400 pr-[5px]">
              {" "}
              Posted: {day}/{month}/{year}
            </p>
          </div>
        </div>
      </div>
      {loading && (
        <div className="w-full h-full">
          <Loading />
        </div>
      )}
    </>
  );
}

export default PostCard;
