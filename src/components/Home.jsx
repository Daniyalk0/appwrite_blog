import React, { useRef } from "react";
import Header from "./Header/Header";
import Container from "./Container";
import GlobalBtn from "./GlobalBtn";
import { NavLink } from "react-router-dom";
import Auth_btn from "../auth/Auth_btn";
import { useSelector } from "react-redux";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";


function Home({ isHamburger }) {

  const ref = useRef()

  useGSAP(() =>{
    gsap.from('.gsap-text', {
      x:-300,
      duration:1,
      delay: 0.80,
      opacity: 0, 
    })
  })  
  useGSAP(() =>{
    gsap.from('.gsap-button', {
      x:300,
      duration:1,
      delay: 1,
      rotate: 300,
      opacity: 0
      
    })
  })  
  


  const userData = useSelector((state) => state.auth.authStatus);
  if (isHamburger) {
    console.log("ishamburger is avaibla", isHamburger);
  } else {
    console.log("hamburger is not avails");
  }
  return (
    <Container className="h-screen ">
      <div className={`relative w-full h-full  transition-all duration-150`}>
        <div className="absolute z-[8] h-full w-full top-[40vh]">
          <div className="w-[100%] m-auto flex flex-col gap-[3vh]   gsap-text">
            <h1 className="text-white text-center text-6xl tablet:text-5xl mobile:text-[8vw]">
              Discover insights, share stories,
            </h1>
            <h1 className="text-white text-center text-6xl tablet:text-5xl mobile:text-[8vw] ">
              ignite passions
            </h1>
          </div>
          <NavLink
            to={userData ? "/createPost" : "/login"}
            className="flex justify-center   gsap-button"
          >
            <GlobalBtn
              className={"mt-14 bg-postcard hover:bg-transparent rounded-3xl w-[20vw] mobile:w-[40vw]"}
            >
              Get Started
            </GlobalBtn>
          </NavLink>
        </div>
        {/* <img
          src="/images/home-banner.jpg"
          alt=""
          className="top-0 left-0 brightness-50  absolute  w-full h-screen"
        /> */}
      </div>
    </Container>
  );
}

export default Home;
