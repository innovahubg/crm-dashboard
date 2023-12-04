import axios from "axios";
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const { token } = JSON.parse(localStorage.getItem("authUser"));

    config.headers = {
      Authorization: `Bearer ${token}`,
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
export const GetData = async (url) => {
  const getData = await axiosApiInstance.get(
    `${process.env.REACT_APP_API}${url}`
  );
  return getData;
};

export const PostData = async (url,data) => {
  const postData = await axiosApiInstance.post(
    `${process.env.REACT_APP_API}${url}`,
    data
  );
  return postData;
};
