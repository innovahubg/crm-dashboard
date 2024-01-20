import React from "react";
import { Navigate, Route } from "react-router-dom";
//redux
import { useSelector, useDispatch } from "react-redux";
import { useProfile } from "../Hooks/UserHooks";
// import { logoutUser } from "../../store/actions";
import { logoutUser } from "../store/actions";

const AuthProtected = (props) => {
  const { userProfile, loading } = useProfile();
  const dispatch = useDispatch();
  // console.log(userProfile);

  // if (userProfile.exp - Date.now() / 1000) {
  //   dispatch(logoutUser());
  // }
  /*
    redirect is un-auth access protected routes via url
    */

  if (!userProfile && loading) {
    return (
      <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
    );
  }

  return <>{props.children}</>;
};

const AccessRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <>
            {" "}
            <Component {...props} />{" "}
          </>
        );
      }}
    />
  );
};

export { AuthProtected, AccessRoute };
