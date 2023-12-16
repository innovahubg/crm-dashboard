import { useState } from "react";
import { getLoggedinUser } from "../helpers/api_helper";

const useProfile = () => {
  const userProfileSession = getLoggedinUser();
  //  console.log("useProfile", userProfileSession);
  const [loading] = useState(userProfileSession ? false : true);
  const [userProfile] = useState(
    userProfileSession ? userProfileSession : null
  );

  return { userProfile, loading };
};

export { useProfile };
