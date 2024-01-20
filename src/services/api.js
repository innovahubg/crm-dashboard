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
  try {
    const getData = await axiosApiInstance.get(
      `${process.env.REACT_APP_API}${url}`
    );
    return getData;
  } catch (err) {
    handledErrors(err);
  }
};

export const PostData = async (url, data, options) => {
  try {
    const defaultHeaders = {
      "Content-Type": "application/json",
    };
    const getData = await axiosApiInstance.post(
      `${process.env.REACT_APP_API}${url}`,
      data,
      options ? options : defaultHeaders
    );
    return getData;
  } catch (err) {
    handledErrors(err);
  }
};

const handledErrors = (fullError) => {
  switch (fullError.response.status) {
    case 401:
      localStorage.removeItem("authUser");
      window.location.href = "/login";
      return { success: false, message: "Unauthorized" };
      break;
    case 500:
      console.log(fullError.response);
      throw new Error("Internal Server Error");
    default:
      break;
  }
};
