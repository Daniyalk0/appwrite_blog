import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import { useDispatch, useSelector } from "react-redux";
import Input from "../auth/Input";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import Auth from "../own_appwrite/Auth";
import Config from "../own_appwrite/Config";
import Auth_btn from "../auth/Auth_btn";
import { useNavigate } from "react-router-dom";
import { login, update } from "../store/AuthSlice";
import { DNA } from "react-loader-spinner";
import authService from "../own_appwrite/Auth";
import { getDPid } from "../store/UserDPslice";
import { Circles } from "react-loader-spinner";

function EditProfile() {
  const [user, setuser] = useState();
  const [gotDP, setGotDP] = useState(null);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.auth.userData);
  const userId = userdata?.$id;

  const userDP = useSelector((state) => state.userDP.userPic);
  const postsData = useSelector((state) => state.posts.postsData);

  useEffect(() => {
    const filterPosts = async () => {
      if (postsData) {
        const filteredPosts = postsData.filter((doc) => doc.userId === userId);
        setPosts(filteredPosts);
      } else {
        console.log("no posts in allposts!!");
      }
    };

    filterPosts();
  }, [postsData, userId]);

  // useEffect(() => {
  //   if (posts) {

  //     console.log(posts);
  //   }

  // }, [])

  const getUserDataAfterUpdate = async () => {
    authService.getCurrentUser().then((userData) => {
      if (userData) {
        dispatch(login(userData));
        console.log("userData in app.jsx");
      } else {
        dispatch(logout());
        console.log("no userData in app.jsx");
      }
    });
  };

  // console.log(posts[0]?.$id);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const objectUrl = URL.createObjectURL(file);
    setImageUrl(objectUrl);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (userdata) {
      setuser(userdata);
    }
  }, []);
  useEffect(() => {
    if (userDP) {
      setGotDP(userDP);
    }
  }, []);
  
  const { register, setValue, getValues, watch, handleSubmit } = useForm();
  useEffect(() => {
    if (user) {
      setValue("name", user.name);
      setValue("email", user.email);
    }
  }, [user, setValue]);
  
  const navigate = useNavigate();
  
  const fetchFiles = async () => {
    if (!userId) return; // If userId is not available, return early

    try {
      const fetchedFiles = await Config.fetchFilesByUserId(userId);
      console.log(fetchedFiles);
      if (fetchedFiles) {
        dispatch(getDPid(fetchedFiles[0]?.$id));
        setUpdateLoading(false);
        navigate('/profile')
      }
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };
  const handleUpdate = async (data) => {
    setUpdateLoading(true);
    try {
      const updatedName = await Auth.updateNamee(data);
      if (updatedName) {
        await Config.updatePostAuthor(posts[0]?.$id, data.name);
        getUserDataAfterUpdate();
      } else {
        // return;
      }
      // if (!updatedName) return;

      if (gotDP && imageUrl) {
        console.log("existing!!");
        const deleteDP = await Config.deleteDP(gotDP);
        if (deleteDP) {
          const uploadDP = await Config.uploadDP(image);
          if (uploadDP) {
            const dpid = uploadDP.$id;
            await Config.updatePostDP(posts[0]?.$id, dpid);

            dispatch(update(data));
            // }
          }
        }
      } else {
        console.log("new!!");

        const DP = await Config.uploadDP(image);
        if (DP) {
          const DPid = DP.$id;
          console.log("dpid", DPid);
          await Config.updatePostDP(posts[0]?.$id, DPid);
        }
      }
      dispatch(update(data));
      await fetchFiles();
    } catch (error) {
      console.log("errorrrrrrr", error);
    }
  };
  //   console.log(Config.getDPPreview(gotDP));

  return (
    <Container>
      <div
        className={`text-white mt-[100px] h-[84vh] flex justify-start items-center ml-[30px] flex-col`}
      >
        <form
          action=""
          onSubmit={handleSubmit(handleUpdate)}
          className={`${
            loading && "hidden"
          } mt-[40px]  w-[400px] mobile:w-[280px]`}
        >
          <div>
            <div className="flex flex-col justify-center items-center mt-[20px]">
              <input
                type="file"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                className="hidden"
                id="fileInput"
                onChange={(e) => handleImageChange(e)}
              />
              <label htmlFor="fileInput">
                <FaUser
                  color="gray"
                  className={`cursor-pointer ${
                    gotDP || imageUrl ? "hidden" : ""
                  } h-[40px] w-[40px]`}
                />
                {(userdata || imageUrl) && (
                  <img
                    src={imageUrl ? imageUrl : Config.getDPPreview(gotDP)}
                    alt=""
                    className={`h-[50px] w-[50px] mobile:mr-[20px]  rounded-3xl mt-[5px]   cursor-pointer ${
                      !gotDP && !imageUrl ? "hidden" : ""
                    }`}
                  />
                )}
              </label>
            </div>
            <Input
              className="h-[40px]  text-zinc-800"
              label="Name: "
              {...register("name", {
                required: true,
              })}
            />
          </div>
          <div>
            <Input
            disabled={true}
              className="h-[40px] text-zinc-800"
              label="Email: "
              {...register("email", {
                required: true,
              })}
            />
          </div>
          <Auth_btn
            type="submit"
            className="m-auto mt-[20px] h-[40px] "
            text={
              updateLoading ? (
                <Circles
                  height="30"
                  width="30"
                  color="#63ee31"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              ) : (
                "Update"
              )
            }
          />
        </form>
      </div>
      {loading && (
        <>
          {" "}
          <div className="mobile:hidden absolute z-10 left-[45%] top-[30%]">
            <DNA
              visible={true}
              height="100"
              width="100"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
          <div className="mobile:block hidden absolute z-10 left-[37%] top-[30%]">
            <DNA
              visible={true}
              height="80"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
            />
          </div>
        </>
      )}
    </Container>
  );
}

export default EditProfile;
