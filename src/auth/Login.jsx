import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../own_appwrite/Auth";
import Container from "../components/Container";
import Auth_btn from "./Auth_btn";
import { FaFacebookSquare } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import Input from "./Input";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../store/AuthSlice";
import { DNA } from "react-loader-spinner";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import PasswordShow from "./PasswordShow";


function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate()

  const log = async (data) => {
    setError('')
    setShowPassword(false)
    setLoading(true)
    try {
      const session = await authService.login(data);
      if (session) {
        setLoading(false)
        const userData = await authService.getCurrentUser();
        console.log('getcurrentuser', userData);
        if (userData) {
          dispatch(login(data))
        }
        navigate('/')
      }
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  };


  function onpass(e) {
    const pass = e.target.value
    if (pass) {
      console.log('pass', pass);
      setError('')
    }else{
      console.log('no eeee');
    }
  }

  return (
    <Container className='h-screen'>
      <div className="w-full h-full relative">
        {/* <img
          src="public/authImage.jpg"
          alt="authimage"
          className="w-full h-full brightness-75 absolute z-5"
        /> */}

        <div className="w-full h-full relative z-0 flex justify-center items-center">
          <div className="w-[30vw] min-w-[600px] h-[75vh] max-h-[600px]  px-4 py-8 bg-white rounded-2xl justify-center items-center relative  mobile:h-[75vh] mobile:w-[90vw] mobile:min-w-[300px] dark:bg-zinc-800 mt-[13vh] ">

            <h1 className="text-center text-5xl text-zinc-700 mb-[5%] ">
              Sign In
            </h1>
            <div className="w-full flex justify-center gap-[2vw] mb-[5%]">
              <Auth_btn
                className="bg-facebook justify-evenly  mobile:w-[30vw]  mobile:min-w-[100px]"
                text="Facebook"
              >
                <FaFacebookSquare
                  size={20}
                  color="white"
                  className="mobile:hidden"
                />
              </Auth_btn>
              <Auth_btn
                text="Google"
                className="text-zinc-800 hover:text-white justify-evenly mobile:w-[30vw] mobile:min-w-[100px]"
              >
                <FcGoogle size={20} className="mobile:hidden" />
              </Auth_btn>
            </div>
            <form
              className="flex flex-col justify-center w-full items-center gap-[3vh] mb-[3%]"
              onSubmit={handleSubmit(log)}
            >
             <div className="w-[40vw] min-w-[300px] max-w-[400px] relative flex justify-center ">
                <Input
                  label="Email"
                  type="email"
                  className="text-[15px] py-2"
                  {...register("email", {
                    required: "Email is Required*",
                  })}
                />
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.6vw]`}
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
                  })}
                  onChange={(e) => onpass(e)}
                />
                <PasswordShow onClick={() => setShowPassword(prev => !prev)} content={showPassword ? <FaRegEyeSlash /> : <FaRegEye/>}/>
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.6vw]`}
                >
                  {errors.password ? errors.password.message : null}
                </p>
                <p
                  className={`absolute top-[100%] left-[2%] text-[0.7vw] text-red-500 font-bold mobile:left-[6%] mobile:text-[1.6vw]`}
                >
                  {error ? 'Incorrect Password': null}
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
            <div className="text-zinc-400 text-xs flex justify-center gap-2">
              <p>Not a member?</p>
              <NavLink
                to="/signup"
                className="hover:text-pink-600 transition-all duration-300 border-b-2 border-zinc-400 hover:border-pink-600"
              >
                Sign Up Now
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Login;
