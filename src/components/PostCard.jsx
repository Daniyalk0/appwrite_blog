import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import service from "../own_appwrite/Config";
import Loading from "./Loading";
import { FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Oval } from "react-loader-spinner";

function PostCard({
  title = "",
  content = "avnfgngidfgfdg",
  imageId,
  className,
  $id,
  date,
  children,
  author,
  userLiked,
  DPid,
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

  const [post, setpost] = useState(null);
  const [likeLoading, setlikeLoading] = useState();
  const [likesCount, setLikesCount] = useState();
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const [gotDP, setGotDP] = useState(null);

  useEffect(() => {
    if (DPid) {
      setGotDP(DPid);
      console.log("dpID", DPid);
    } else {
      console.log("no DPid");
    }
  }, []);

  const userData = useSelector((state) => state.auth.userData);

  const likeId = userData?.$id.slice(-5) + post?.$id.slice(-5);

  // const { slug } = useParams();
  const slug = $id;

  const navigate = useNavigate();
  // console.log('userLiked', likedUsers);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((postt) => {
        if (postt) {
          setLoading(false);
          setpost(postt);
          setLikedUsers(postt?.userLiked);
          setLikesCount(postt?.likes || 0);
          checkLike(userData.$id, postt?.$id);
        } else {
          console.log("no post in post comp.");
          navigate("/");
        }
      });
    } else navigate("/");
  }, [slug, navigate, userData, likesCount, user]);

  const likePost = async (e) => {
    e.stopPropagation();
    setlikeLoading(true);
    try {
      if (liked) {
        const deletee = await service.deleteLike(likeId);
        if (deletee) {
          setLiked(false);
          const currentLikes = (await post?.likes) || 0;
          const newLikesCount = (await currentLikes) > 0 ? currentLikes - 1 : 0;
          await service.updateLike(post.$id, newLikesCount);
          await service.deleteLikedUser(post?.$id, userData?.name);
          setlikeLoading(false);
          setLikesCount(newLikesCount);
        } else {
          console.log("delete function is not wokring!!");
        }
      } else {
        await service.createLike(likeId, userData.$id, post.$id, [
          userData.name,
        ]);
        const postLikes = (await post?.likes) || 0;
        const newLikes = (await postLikes) + 1;
        await service.updateLike(post.$id, newLikes);
        await service.updateLikedUsers(post?.$id, userData?.name);
        setLikesCount(newLikes);
        setlikeLoading(false);

        console.log("postlikes", postLikes);
        setLiked(true);
      }
    } catch (error) {
      console.log("error in like post!", error);
    }
  };

  const checkLike = async (userId, postId) => {
    try {
      const likeExists = await service.getLikesByUserAndPost(userId, postId);
      setLiked(likeExists);
    } catch (error) {
      console.log("error while checking the like", error);
    }
  };
  const navigatePost = () => {
    navigate(`/post/${$id}`);
  };

  const toUserCard = (e) => {
    e.stopPropagation();
    navigate(`/userCard/${author}`);
  };

  return (
    <>
      <div
        className={`${className}  gap-3 bg-zinc-100 dark:bg-postcard shadow-md shadow-darkgreen  dark:shadow-xl dark:shadow-zinc-100 flex  p-4 justify-around items-center  text-white rounded-2xl w-[900px] relative  max-w-[1000px]  transition-all duration-200 hover:shadow-lg hover:shadow-zinc-300 tablet:flex-col tablet:w-[80vw]  mobile:max-w-[0px] mobile:min-w-[90vw]`}
        onClick={navigatePost}
        {...props}
      >
        {location.pathname === "/allPosts" ? (
          <div
            className="flex cursor-pointer  justify-center items-center flex-col  w-[50px] absolute left-[5px] top-[10px] tablet:relative tablet:mb-[20px] hover:scale-[1.1] transition-all duration-200"
            onClick={(e) => toUserCard(e)}
          >
            {DPid ? (
              <img
                src={service.getDPPreview(DPid)}
                alt="noo"
                className={`h-[40px] w-[40px]  rounded-3xl mt-[5px]   cursor-pointer`}
              />
            ) : (
              <FaUser color="gray" className={`h-[20px] w-[20px]  rounded-3xl mt-[5px]   cursor-pointer`}/>
            )}
            <p className="underline  text-gray-600 text-[10px] font-semibold tracking-widest uppercase w-full text-center">
              {author}
            </p>
          </div>
        ) : (
          ""
        )}

        <div className=" flex flex-col flex-wrap cursor-pointer">
          <h1 className="text-[30px] w-full break-words text-darkgreen dark:text-white font-semibold content leading-[1.2]">
            {title}
          </h1>
          <p
            className={`text-[12px] text-black  dark:text-white w-full content`}
          >
            {parse(content)}
          </p>
        </div>
        <div className="max-w-[600px] flex  flex-col tablet:items-center ">
          <p className="text-[10px] text-right tablet:w-full text-zinc-500 dark:text-zinc-400 ">
            {" "}
            Posted: {day}/{month}/{year} <br />
            {hours}:{minutes}:{seconds}
          </p>

          <img
            src={`${service.getFilePreview(imageId)}`}
            alt="image"
            className=" rounded-lg w-full h-[60vh] max-h-[430px] min-w-[400px]  tablet:min-w-[0px] mobile:h-[300px] max-w-[600px]"
          />

          <div className="flex items-center  w-full ml-[0px] mt-[5px] tablet:justify-center ">
            <div
              className="flex bg-blue-900 p-1 w-[45px] justify-around rounded-lg text-zinc-200 cursor-pointer"
              onClick={(e) => likePost(e)}
            >
              <div>{likesCount}</div>
              <p>
                {likeLoading ? (
                  <Oval
                    visible={true}
                    height={20}
                    width={20}
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : liked ? (
                  <i
                    className="fa fa-heart"
                    style={{ color: "#ff0000" }}
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i className="far fa-heart" aria-hidden="true"></i>
                )}
              </p>
            </div>
            <p className="ml-[6px] mt-[4px] text-[15px]  text-black dark:text-white">
              {likedUsers.length === 1 && `liked by  ${likedUsers[0]}`}
              {likedUsers.length === 0 && "be the First like!"}
              {likedUsers.length > 1 &&
                `Liked by ${post?.author} and ${likedUsers.length - 1} others`}
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
