import React from "react";
import { IoIosLogOut } from "react-icons/io";
import service from "../own_appwrite/Auth";
import { useDispatch } from "react-redux";
import { logout } from "../store/AuthSlice";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "./Loading";
import Container from "./Container";
import { Circles } from "react-loader-spinner";


function Logout({ className, text = "f", ...props }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(false);

  function logOutHandler() {
    setLoading(true);
    service.logOut().then(() => {
      setLoading(false);
      dispatch(logout());
      window.location.reload();
      navigate("/");

    });
  }
  return (
    <>
      <div className={`w-[8vw] ${className}`}>
        <button
          className="border border-darkgreen cursor-pointer  py-1 px-3  text-darkgreen rounded-2xl hover:bg-darkgreen hover:text-green-100 transition-all  duration-300 hover:drop-shadow-xl hover:border-transparent font-custom flex items-center justify-around tablet:text-[15px] w-[80px] ease-in-out dark:text-white dark:hover:bg-green-700 mobile:h-[30px]"
          onClick={logOutHandler}
          {...props}
        >
          {
            (text = loading ? (
              <Circles
                height="25"
                width="25"
                // color="#162a0e"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            ) : (
              "Logout"
            ))
          }
          <IoIosLogOut className={`mobile:hidden ${loading && 'hidden'}`} />
        </button>
      </div>

    </>
  );
}

export default Logout;
