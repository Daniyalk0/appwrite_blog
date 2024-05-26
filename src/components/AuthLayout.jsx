import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setloader] = useState(true)
  const userStatus = useSelector((state) => state.auth.authStatus);

  useEffect(() => {
    if (authentication && userStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && userStatus !== authentication) {
      navigate("/");
    }
    setloader(false)
  }, [authentication, userStatus , navigate]);

  return !loader ? <>{children}</> : <h1>loading...</h1>;
}

export default AuthLayout;
