import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { NavLink, useLocation } from "react-router-dom";
import service from "../own_appwrite/Config";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa6";

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
  const location = useLocation();

  const datee = new Date(date);

  const month = datee.toLocaleDateString(undefined, { month: "long" });
  const year = datee.getFullYear();
  const day = datee.getUTCDate();
  const hours = datee.getHours();
  const minutes = datee.getMinutes();
  const seconds = datee.getSeconds();

  return (
    <>
    <NavLink to={`/post/${$id}`}>

      <div
        className={`${className}  gap-3 bg-zinc-100 dark:bg-postcard shadow-md shadow-darkgreen  dark:shadow-xl dark:shadow-zinc-100 flex  p-4 justify-center items-center  text-white rounded-2xl w-[900px] relative  max-w-[1000px]  transition-all duration-200 hover:shadow-lg hover:shadow-zinc-300 tablet:flex-col tablet:w-[80vw]  mobile:max-w-[0px] mobile:min-w-[90vw]`}
        {...props}
      >
        {location.pathname === "/allPosts" ? (
          <div className="flex cursor-pointer  justify-center items-center flex-col  w-[50px] absolute left-[5px] top-[10px] tablet:relative tablet:mb-[20px]">
            <FaUser color="gray" />
            <p className="pl-[5px] underline  text-gray-600 text-[10px] font-semibold tracking-widest uppercase">
              {author}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className=" flex flex-col flex-wrap">
          <h1 className="text-[30px] w-full break-words text-darkgreen dark:text-white font-semibold content leading-[1.2]">
            {title}
          </h1>
          <p
            className={`text-[12px] text-black  dark:text-white w-full content`}
          >
            {parse(content)}
          </p>
        </div>
        <div className="w-full flex  flex-col tablet:items-center ">
          <p className="text-[10px] text-right tablet:w-full text-zinc-500 dark:text-zinc-400 ">
            {" "}
            Posted: {day}/{month}/{year} <br />
            {hours}:{minutes}:{seconds}
          </p>

          <img
            src={`${service.getFilePreview(imageId)}`}
            alt="image"
            className=" rounded-lg w-full h-[60vh] max-h-[470px] min-w-[400px]  tablet:min-w-[0px] mobile:h-[300px]"
          />
        </div>
      </div>
      </NavLink>
      {loading && (
        <div className="w-full h-full">
          <Loading />
        </div>
      )}
    </>
  );
}

export default PostCard;
