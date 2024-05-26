import React, { useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { useSelector } from "react-redux";

function Footer({ className }) {
  const [themeMode, setthemeMode] = useState();

  const theme = useSelector((state) => state.themee.theme);
  useEffect(() => {
    if (theme) {
      setthemeMode(theme);
      console.log("theme  got", theme);
    } else {
      console.log("theme not got");
    }
   
  }, [theme])
  

  return (
    <div
      className={`w-full h-full flex flex-col  items-center  text-white relative ${className}  z-[10] bg-footer dark:bg-zinc-900 mobile:h-[33vh] mobile:relative mobile:top-[7vh] mobile:max-h-[500px]`}
    >
      <div className="flex flex-col w-full justify-center items-center mt-[20px]  gap-[10px] ">
        <div className="flex ">
          <h1
            className={`logo text-[50px] dark:text-yellow-700 mobile:text-[30px] ${
              themeMode === 'light' ? "logo-dark" : "logo"
            }`}
          >
            B.
          </h1>
          <h1 className={` logo2 text-[30px] mt-[20px] mobile:text-[20px] mobile:mt-[10px] dark:text-yellow-700 ${
              themeMode === 'light' ? "logo-dark-2" : "logo2"
            }`}>
            Log()
          </h1>
        </div>

        <div>
          <p className="text-center text-[10px] w-[450px] mobile:w-[70vw] text-zinc-400 font-semi footer ">
            Discover the power of words with our blog app. Share your stories,
            connect with a community of readers, and let your voice be heard.
            Start blogging today and inspire the world.
          </p>
        </div>
        <a
          href="https://github.com/Daniyalk0"
          target="_blank"
          className="w-full flex justify-center items-center mt-[20px] cursor-pointer"
        >
          <FaGithub
            size={25}
            className="hover:scale-[1.2] transition-all duration-150"
          />
        </a>
      </div>

      <div className="text-[12px] absolute bottom-[1vh] text-zinc-300">
        Copyright &copy;2024 B.log() All Rights Reserved.
      </div>
    </div>
  );
}

export default Footer;
