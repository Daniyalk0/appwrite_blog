import React, { useEffect, useState } from "react";
import Container from "../components/Container";
import Auth_btn from "./Auth_btn";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import authService from "../own_appwrite/Auth";
import Input from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/AuthSlice";
import Loading from "../components/Loading";
import { DNA } from "react-loader-spinner";
import PasswordShow from "./PasswordShow";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";


function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, seterror] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)

  const onSubmit = async (data) => {
    setShowPassword(false)
    setShowPasswordConfirm(false)
    setLoading(true);
    seterror("");
    console.log("Form data:", data);
    try {
      const user = await authService.createAccount(data);
      if (user) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          setLoading(false);
          dispatch(login(data));
        }
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      seterror(error.message);
      console.log("error in crerating", error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const buttonLog = (e) => {
    alert(`Haven't added '${e}' functionality yet!`);
  };

  return (
    <Container className="">
      <div className="w-full h-full relative ">
        <div className="w-full h-full relative z-0 flex justify-center items-center border-3  overflow-auto">

          <div className=" min-w-[500px] h-[90vh] max-h-[700px] px-4 py-8  bg-white rounded-2xl justify-center items-center relative   mobile:w-[90vw] mobile:min-w-[300px] dark:bg-zinc-800 mt-[15vh] mb-[5vh]">
            <h1 className="text-center text-5xl text-zinc-700 mb-[2%] ">
              Sign Up
            </h1>
            <div className="w-full flex justify-center gap-[2vw] mb-[3%]">
              <Auth_btn
                className="bg-facebook justify-evenly h-[7vh] mobile:w-[30vw]  mobile:min-w-[100px]"
                text="Facebook"
                onClick={() => buttonLog("Facebook")}
              >
                <FaFacebookSquare
                  size={30}
                  color="white"
                  className="mobile:hidden"
                />
              </Auth_btn>
              <Auth_btn
                text="Google"
                className="text-zinc-800 hover:text-white h-[7vh] justify-evenly mobile:w-[30vw] mobile:min-w-[100px]"
                onClick={() => buttonLog("Google")}
              >
                <FcGoogle size={30} className="mobile:hidden" />
              </Auth_btn>
            </div>
            <form
              className="flex flex-col justify-center w-full items-center gap-[3vh] mb-[3%]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-[40vw] min-w-[300px] max-w-[400px] relative flex justify-center">
                <Input
                  label="Name"
                  className={`text-[15px] py-2`}
                  {...register("name", {
                    required: "Name is Required",
                  })}
                />
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] 
                  tablet:text-[1vw]  text-red-500 ${
                    errors.name ? "" : "border-red-500"
                  } font-bold mobile:left-[6%] mobile:text-[1.4vw]`}
                >
                  {errors.name ? "Name is Required*" : null}
                </p>
              </div>
              <div className="w-[40vw] min-w-[300px] max-w-[400px] relative flex justify-center">
                <Input
                  label="Email"
                  type="email"
                  className="text-[15px] py-2"
                  {...register("email", {
                    required: "Email is Required*",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.4vw]`}
                >
                  {errors.email ? errors.email.message : null}
                </p>
              </div>
              <div className="w-[40vw] min-w-[300px] max-w-[400px] relative flex justify-center ">
                <Input
                  label="Password"
                  type={`${showPassword ? 'text' : 'password'}`}
                  className=" text-[15px] py-2"
                  {...register("password", {
                    required: "Password is Required*",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long*",
                    },
                    validate: {
                      uppercase: (value) =>
                        /[A-Z]/.test(value) ||
                        "Password must contain at least one uppercase letter*",
                      lowercase: (value) =>
                        /[a-z]/.test(value) ||
                      "Password must contain at least one lowercase letter*",
                      specialCharacter: (value) =>
                        /[!@#$%^&*(),.?":{}|<>]/.test(value) ||
                      "Password must contain at least one special character*",
                    },
                  })}
                  />
                  <PasswordShow onClick={() => setShowPassword(prev => !prev)} content={showPassword ? <FaRegEyeSlash /> : <FaRegEye/>}/>
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.4vw]`}
                >
                  {errors.password ? errors.password.message : null}
                </p>
              </div>
              <div className="w-[40vw] min-w-[300px] max-w-[400px] relative flex justify-center">
                <Input
                  label="Confirm Password"
                  type={`${showPasswordConfirm ? 'text' : 'password'}`}
                  className="text-[15px] py-2"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required*",
                    validate: {
                      matchesPassword: (value) =>
                        value === watch("password") ||
                        "Passwords do not match*",
                    },
                  })}
                />
                  <PasswordShow onClick={() => setShowPasswordConfirm(prev => !prev)} content={showPasswordConfirm ? <FaRegEyeSlash /> : <FaRegEye/>}/>

                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.4vw]`}
                >
                  {errors.confirmPassword
                    ? errors.confirmPassword.message
                    : null}
                </p>
              </div>

              <Auth_btn
                className="w-[70%]  bg-black h-[3vh] mt-[2vh]"
                text={ loading ? (<>
                <div className="absolute inset-0 bg-black opacity-80 w-screen" />
                <div className=" absolute z-50">
                  <DNA
                    visible={true}
                    height="50"
                    width="50"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper"
                  />
                </div>
                    </>
                ) : 'Sign In'}
                type="submit"
              />
            </form>
            <div className="text-zinc-400 text-xs flex justify-center gap-1 ">
              <p>Already a member?</p>
              <NavLink
                className="hover:text-pink-600 transition-all duration-300 border-b-2 border-zinc-400 hover:border-pink-600 "
                to="/login"
              >
                Sign In Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Signup;
