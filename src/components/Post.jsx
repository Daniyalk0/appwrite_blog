import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import { useSelector } from "react-redux";
import Container from "./Container";
import Auth_btn from "../auth/Auth_btn";
import parse from "html-react-parser";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Loading from "./Loading";

function Post() {

  const [post, setpost] = useState(null);
  const [loading, setLoading] = useState(true);

  const userData = useSelector((state) => state.auth.userData);
  const { slug } = useParams();

  const navigate = useNavigate();

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((postt) => {
        if (postt) {
          setLoading(false)
          setpost(postt);
          console.log('post', postt);
        } else {
          console.log("no post in post comp.");
        }
      });
    } else navigate("/");
  }, [slug]);

  const deletePost = async () => {
    setLoading(true);
    if (post) {
      service.deletePost(post.$id).then((file) => {
        if (file) {
          setLoading(false);
          service.deleteFile(post.featuredImage);
          navigate("/");
        }
      });
    }
  };



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
            <img
              src="https://t4.ftcdn.net/jpg/05/71/83/47/360_F_571834789_ujYbUnH190iUokdDhZq7GXeTBRgqYVwa.jpg"
              alt="authimage"
              className="w-full h-full brightness-75 absolute top-0 z-[-1] "
            />
            <div className="w-[50%] max-w-[700px] min-w-[400px] flex justify-center relative items-center flex-col gap-[1vw]">
              <img
                src={service.getFilePreview(post?.imageId)}
                alt="no image"
                className="rounded-xl  w-[100%] max-h-[420px] hover:shadow-md hover:shadow-zinc-400 transition-all duration-200 object-fit"
              />
              {isAuthor && (
                <div className="flex gap-3 ">
                  <div>
                    <Auth_btn
                      text=""
                      className=" w-[5vw] mobile:w-[7vw] text-[1vw] border-white max-h-[10px]"
                      onClick={deletePost}
                    >
                      <MdDelete size={20} color="" />
                    </Auth_btn>
                  </div>
                  <NavLink to={`/editPost/${slug}`}>
                    <Auth_btn
                      text=""
                      className=" w-[5vw] mobile:w-[7vw] text-[1vw] max-h-[10px]"
                    >
                      <FaEdit size={20} color="" />
                    </Auth_btn>
                  </NavLink>
                </div>
              )}
              <div className=" w-full   flex justify-center flex-col items-center ">
                <h1 className="text-[4vw] text-white">{post?.title}</h1>
                <div className="w-[70%] ">
                  <p className="text-[1vw] text-center text-white w-full break-words">
                    {parse(post?.content)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </>
    )
  );
}

export default Post;