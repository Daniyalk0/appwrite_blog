import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";
import { DNA } from "react-loader-spinner";
import Loading from "./Loading";

function EditPost() {
  const { slug } = useParams();
  console.log("slug", slug);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const userData = useSelector((state) => state.auth.userData);
  console.log("userData", userData);
  const [loading, setLoading] = useState(true);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    service.getPost(slug).then((postss) => {
      if (postss) {
        setPost(postss);
        setLoading(false);
      } else {
        navigate("/");
      }
    });
  }, []);

  if (isAuthor || !loading) {
    return <CreatePost post={post} />;
  } else if (loading) {
    return <Loading />;
  } else {
    navigate("/");
    return null;
  }
}

export default EditPost;
