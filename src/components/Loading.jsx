import React from "react";
import ReactLoading from "react-loading";
import { DNA } from "react-loader-spinner";

const Loading = ({ className }) => (
  <div
    className={` w-full h-auto z-50 top-[0px] left-0 flex justify-center items-center min-h-[100vh] ${className}`}
  >
    <div className="absolute inset-0 bg-black opacity-80 w-screen" />
    <div className="mobile:hidden absolute z-50">
      <DNA
        visible={true}
        height="100"
        width="100"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
    <div className="mobile:block hidden absolute">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  </div>
);

export default Loading;
