import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import { useSelector } from "react-redux";
import Container from "./Container";
import Auth_btn from "../auth/Auth_btn";
import parse from "html-react-parser";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "./Loading";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Oval } from "react-loader-spinner";

function Post() {
  const [post, setpost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [likeLoading, setlikeLoading] = useState();
  const [user, setuser] = useState(null);
  const [likedUsers, setLikedUsers] = useState([]);
  const location = useLocation();
  // const userdata = useSelector((state) => state.auth.userData);

  const userData = useSelector((state) => state.auth.userData);
  // console.log('post', post);
  const [likesCount, setLikesCount] = useState();
  const [liked, setLiked] = useState(false);
  useEffect(() => {
    if (userData) {
      setuser(userData);
    } else {
      alert("no user data");
    }
  }, [userData]);

  const likeId = userData?.$id.slice(-5) + post?.$id.slice(-5);
  console.log("like Id", likeId);

  const { slug } = useParams();

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

  const deletePost = async () => {
    setLoading(true);
    if (post) {
      setTimeout(() => {
        service.deleteFile(post.imageId);
        service.deletePostAndLikes(post.$id);
        setLoading(false);
        navigate("/");
      }, 1000);
    }
  };

  const likePost = async () => {
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
      console.log("liked", liked);
    } catch (error) {
      console.log("error while checking the like", error);
    }
  };

  // const displayLikes = async ()

  if (loading) {
    return <Loading className="h-screen" />;
  }

  return (
    post && (
      <>
        <Container className="">
          <div
            className={`w-full h-auto min-h-[700px] p-4 flex justify-center items-center relative pt-[90px] flex-col tablet:pt-0`}
          >
            <div className="w-full max-w-[1200px]  flex justify-evenly relative items-center tablet:flex-col tablet:mt-[120px]">
              <img
                src={service.getFilePreview(post?.imageId)}
                alt="no image"
                className="rounded-xl  w-[100%] max-h-[420px] hover:shadow-md hover:shadow-zinc-400 transition-all duration-200 object-fit"
              />
              <div className=" items-center  w-full ml-[120px] mt-[5px] tablet:justify-center  hidden tablet:flex tablet:ml-[0px]">
                <div
                  className="flex bg-blue-900 p-1 w-[45px] justify-around rounded-lg text-zinc-200 cursor-pointer"
                  onClick={likePost}
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
                <p className="ml-[6px] mt-[4px] text-[15px] profile dark:text-white">
                  {likedUsers.length === 1 && `liked by  ${likedUsers[0]}`}
                  {likedUsers.length === 0 && "be the First like!"}
                  {likedUsers.length > 1 &&
                    `Liked by ${post?.author} and ${
                      likedUsers.length - 1
                    } others`}
                </p>
              </div>
              <div className=" w-[100%] flex  flex-col items-left mx-[3vw] flex-wrap tablet:mt-[30px] mobile:mt-[50px]">
                <p className="text-[13px] text-zinc-800 dark:text-zinc-300">
                  posted by:{" "}
                  <NavLink
                    to={`/userCard/${post?.author}`}
                    className="underline-offset-1 cursor-pointer hover:text-zinc-900 transition-all duration-100 font-bold dark:text-white"
                  >
                    {post?.author}
                  </NavLink>
                </p>

                <h1 className="text-[4vw] tablet:text-[6vw] mobile:text-[9vw] text-white w-full content">
                  {post?.title}
                </h1>

                <p className="text-[1vw]  text-white w-full break-words tablet:text-[2vw] mobile:text-[4vw] content">
                  {parse(post?.content)}
                </p>
              </div>
            </div>
            {isAuthor && (
              <div className="flex gap-3 mt-[10px] mobile:mt-[40px]">
                <div>
                  <Auth_btn
                    text=""
                    className=" w-[5vw] mobile:w-[20vw] text-[1vw] border-white max-h-[10px]"
                    onClick={deletePost}
                  >
                    <MdDelete size={20} color="" />
                  </Auth_btn>
                </div>
                <NavLink to={`/editPost/${slug}`}>
                  <Auth_btn
                    text=""
                    className=" w-[5vw] mobile:w-[20vw] text-[1vw] max-h-[10px]"
                  >
                    <FaEdit size={20} color="" />
                  </Auth_btn>
                </NavLink>
              </div>
            )}
            <div className="flex items-center  w-full ml-[120px] mt-[5px] tablet:justify-center tablet:border-2 tablet:border-black tablet:hidden">
              <div
                className="flex bg-blue-900 p-1 w-[45px] justify-around rounded-lg text-zinc-200 cursor-pointer"
                onClick={likePost}
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
              <p className="ml-[6px] mt-[4px] text-[15px] profile">
                {likedUsers.length === 1 && `liked by  ${likedUsers[0]}`}
                {likedUsers.length === 0 && "be the First like!"}
                {likedUsers.length > 1 &&
                  `Liked by ${post?.author} and ${
                    likedUsers.length - 1
                  } others`}
              </p>
            </div>
          </div>
        </Container>
      </>
    )
  );
}

export default Post;
