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
          setLoading(false);
          setpost(postt);
          console.log("post", postt);
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
            <div className="w-full max-w-[1200px]  flex justify-evenly relative items-center tablet:flex-col tablet:mt-[120px]">
              <img
                src={service.getFilePreview(post?.imageId)}
                alt="no image"
                className="rounded-xl  w-[100%] max-h-[420px] hover:shadow-md hover:shadow-zinc-400 transition-all duration-200 object-fit"
              />
              <div className=" w-[100%] flex  flex-col items-left mx-[3vw] flex-wrap tablet:mt-[30px] mobile:mt-[50px]">
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
          </div>
        </Container>
      </>
    )
  );
}

export default Post;
