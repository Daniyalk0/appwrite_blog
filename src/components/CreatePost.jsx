import React, { useCallback, useEffect, useState } from "react";
import Container from "./Container";
import Input from "../auth/Input";
import RTE from "./RTE";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import configService from "../own_appwrite/Config";
import GlobalBtn from "./GlobalBtn";
import service from "../own_appwrite/Config";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Circles } from "react-loader-spinner";
import { nanoid } from "nanoid";

function CreatePost({ post }) {
  const [slugg, setSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [emaill, setEmail] = useState(false);
  const [gotDP, setGotDP] = useState(null);

  const loaction = useLocation();
  const userDP = useSelector((state) => state.userDP.userPic);
  useEffect(() => {
    if (userDP) {
      setGotDP(userDP);
    }
  }, []);

  const [ids, setIds] = useState();

  const generateUniqueId = () => {
    const newId = nanoid();
    if (newId.length > 5) {
      setIds(newId.substring(0, 6));
    }
  };
  useEffect(() => {
    generateUniqueId();
  }, [location]);
  console.log(ids);

  console.log("slugg", slugg);
  const { register, handleSubmit, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || "active",
        author: post?.author || "",
        author: post?.email || "",
      },
    });

  const date = new Date();


  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    const username = userData.name;
    setValue("author", username);
  }, [userData]);

  useEffect(() => {
    const userEmail = userData.email;
    if (emaill) {
      setValue("email", null);
    } else {
      setValue("email", userEmail);
    }
  }, [userData, emaill]);

  const submit = async (data) => {
    setLoading(true);
    if (post) {
      const file = data.image[0]
        ? await configService.uploadFile(data.image[0])
        : null;
      if (file) {
        configService.deleteFile(post.featuredImage);
      }
      const dbPost = await configService.updatePost(post.$id, {
        ...data,
        imageId: file ? file.$id : undefined,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const file = await configService.uploadFile(data.image[0]);
      if (file) {
        const fileId = file.$id;
        data.imageId = fileId;
        const dbPost = await configService.createPost({
          ...data,
          slug: ids,
          userId: userData.$id,
          date: date,
          DPid: gotDP,
        });

        if (dbPost) {
          navigate("/allPosts");
        }
      }
    }
  };

  // const slugTransform = useCallback((value) => {
  //   if (value && typeof value === "string")
  //     return value
  //       .trim()
  //       .toLowerCase()
  //       .replace(/[^a-zA-Z\d\s]+/g, "-")
  //       .replace(/\s/g, "-");

  //   return "";
  // }, []);

  // useEffect(() => {
  //   const subscription = watch((value, { name }) => {
  //     if (name === "title") {
  //       setSlug(slugTransform(value.title));
  //     }
  //   });

  //   return () => {
  //     subscription.unsubscribe();
  //   };
  // }, [watch, slugTransform, setValue]);

  const imagee = watch("image");
  const imageFile = imagee && imagee.length > 0 ? imagee[0] : null;

  return (
    <>
      <Container className="relative">
        <div
          className={`w-full h-auto min-h-[110vh] top-0  ${
            post && "startLoading"
          }`}
        >
          <form
            className={` relative w-full h-auto  mt-[80px] mb-[0px] pb-[10px] tablet:mt-[80px]  text-white overflow-hidden `}
            onSubmit={handleSubmit(submit)}
          >
            <div className="w-[50vw] flex justify-left ml-[3vw] tablet:justify-center pt-[20px] tablet:w-[90vw] tablet:ml-[5vw]">
              <Input
                disabled={loading}
                className="h-[40px] text-zinc-800"
                placeholder="author..."
                label="Author: "
                {...register("author", {
                  required: true,
                })}
              />
            </div>
            <div className="w-[50vw] flex justify-left items-left ml-[3vw] tablet:justify-center pt-[20px] tablet:w-[90vw] tablet:ml-[5vw] flex-col mobile:ml-[9vw]">
              <Input
                disabled={loading}
                className="h-[40px] text-zinc-800 "
                placeholder="Email"
                label="Email: "
                {...register("email", {
                  required: !emaill,
                })}
              />
              <div className="flex w-[50%] ml-[5px]">
                <p className="text-[10px] text-yellow-500 dark:text-white">Don't show my email to anyone</p>
                <input
                  type="checkbox"
                  onChange={() => setEmail((prev) => !prev)}
                  checked={emaill}
                  className="cursor-pointer"
                />
              </div>
            </div>
            <div className="w-[50vw] flex justify-left ml-[3vw] tablet:justify-center pt-[20px] tablet:w-[90vw] tablet:ml-[5vw]">
              <Input
                disabled={loading}
                className="h-[40px] text-zinc-800"
                placeholder="title"
                label="Title"
                {...register("title", {
                  required: true,
                })}
              />
            </div>
            <div className="w-full flex justify-center tablet:items-center  mt-[10px]  h-[420px] gap-[8vw] tablet:flex-col tablet:gap-[3vw]">
              <div className="w-[700px] tablet:w-[90vw] tablet:mt-[120px]">
                <RTE
                  disabled={loading}
                  name={"content"}
                  label={"Content"}
                  control={control}
                  defaultValue={getValues("content")}
                />
              </div>
              <div className="flex flex-col h-[500px] w-[470px] tablet:justify-center  tablet:w-full tablet:items-center">
                <div className="w-[30vw] flex justify-left tablet:justify-center tablet:items-center tablet:w-[80vw] ">
                  <Input
                    disabled={loading}
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    label="Image"
                    className="mb-3"
                    {...register("image", {
                      required: !post,
                    })}
                  />
                </div>
                {(post || imageFile) && (
                  <img
                    src={
                      imageFile
                        ? URL.createObjectURL(imageFile)
                        : service.getFilePreview(post?.imageId)
                    }
                    alt=""
                    className="min-w-full h-[350px] shadow-md shadow-slate-300 rounded-md mt-[5px] tablet:hidden"
                  />
                )}
              </div>
            </div>
            <div className="w-full flex justify-center tablet:w-[100vw] ">
              <GlobalBtn
                disabled={loading}
                text={
                  loading ? (
                    <Circles
                      height="30"
                      width="30"
                      color="#63ee31"
                      ariaLabel="circles-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                    />
                  ) : post ? (
                    "Update"
                  ) : (
                    "Create"
                  )
                }
                type="submit"
                className={`border w-[50%] border-zinc-400 mt-[30px] tablet:mb-[25px] tablet:mt-[23vh] flex justify-center ${
                  post && "text-black bg-zinc-400"
                }`}
              />
            </div>
          </form>
        </div>
      </Container>
    </>
  );
}

export default CreatePost;
