import React from "react";

function Popup() {
  return (
    <div class="relative bg-gray-900 ">
    
    <div class="absolute inset-0 bg-black opacity-50 "></div>
    
    <div class="relative z-10 w-[30vw] h-[30vh]">
      <p class="text-white">Your content here</p>
    </div>
  </div>
  
  );
}

export default Popup;
