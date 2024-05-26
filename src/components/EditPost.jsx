import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import service from "../own_appwrite/Config";
import CreatePost from "./CreatePost";
import { useSelector } from "react-redux";

function EditPost() {
  const { slug } = useParams();
  console.log("slug", slug);
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const userData = useSelector(state => state.auth.userData)
  console.log('userData', userData);
  const [loading, setLoading] = useState(false);
  const isAuthor = post && userData ? post.userId === userData.$id : false;


  useEffect(() => {
    service.getPost(slug).then((postss) => {
      if (postss) {
        setPost(postss);
        setLoading(true);
      } else {
        navigate("/");
      }
    });
  }, []);

  return  isAuthor ? <CreatePost post={post} /> : 
  navigate('/');
}

export default EditPost;
