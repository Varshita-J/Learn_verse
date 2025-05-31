// import { useAuthStore } from "../store/auth";
// import axios from "./axios";
// import jwt_decode from "jwt-decode";
// import Cookie from "js-cookie";
// import Swal from "sweetalert2";

// export const login = async (email, password) => {
//     try {
//       const { data, status } = await axios.post(`user/token/`, {
//         email,
//         password,
//       });

//       if (status === 200) {
//         setAuthUser(data.access, data.refresh);
//       }

//       return { data, error: null };
//     } catch (error) {
//       return {
//         data: null,
//         error: error.response.data?.detail || "Something went wrong",
//       };
//     }
//   };

// export const register = async (full_name, email, password, password2) => {
//     try {
//       const { data } = await axios.post(`user/register/`, {
//         full_name,
//         email,
//         password,
//         password2,
//       });

//       await login(email, password);
//       return { data, error: null };
//     } catch (error) {
//       return {
//         data: null,
//       error:
//         `${error.response.data.full_name} - ${error.response.data.email}` ||
//         "Something went wrong",
//       };
//     }
//   };

//   export const logout = () => {
//     Cookie.remove("access_token");
//     Cookie.remove("refresh_token");
//     useAuthStore.getState().setUser(null);
//     alert("You have been logged out!")
//   };

//   export const setUser = async () => {
//     const access_token = Cookie.get("access_token");
//     const refresh_token = Cookie.get("refresh_token");

//     if (!access_token || !refresh_token) {
//       // alert("Tokens does not exists");
//       return;
//     }

//     if (isAccessTokenExpired(access_token)) {
//       const response = getRefreshedToken(refresh_token);
//       setAuthUser(response.access, response.refresh);
//     } else {
//       setAuthUser(access_token, refresh_token);
//     }
//   };

// export const setAuthUser = (access_token, refresh_token) => {
//     Cookie.set("access_token", access_token, {
//       expires: 1,
//       secure: true,
//     });

//     Cookie.set("refresh_token", refresh_token, {
//       expires: 7,
//       secure: true,
//     });

//     const user = jwt_decode(access_token) ?? null;

//     if (user) {
//       useAuthStore.getState().setUser(user);
//     }
//     useAuthStore.getState().setLoading(false);
//   };

//   export const getRefreshedToken = async () => {
//     const refresh_token = Cookie.get("refresh_token");
//     const response = await axios.post(`user/token/refresh/`, {
//       refresh: refresh_token,
//     });
//     return response.data;
//   };

//   export const isAccessTokenExpired = (access_token) => {
//     try {
//       const decodedToken = jwt_decode(access_token);
//       return decodedToken.exp < Date.now() / 1000;
//     } catch (error) {
//       console.log(error);
//       return true;
//     }
//   };

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import { useAuthStore } from "../store/auth";
import axios from "./axios";
import jwt_decode from "jwt-decode";
import Cookie from "js-cookie";
import Swal from "sweetalert2";
//import apiInstance from "./axios";  // Import the axios instance

// OLD CODE COMMENTED WITH EXPLANATIONS

/*
// The original login function lacked error feedback if the status was not 200
export const login = async (email, password) => {
    try {
        const { data, status } = await axios.post(`user/token/`, {
            email,
            password,
        });

        if (status === 200) {
            setAuthUser(data.access, data.refresh);
        }

        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: error.response.data?.detail || "Something went wrong",
        };
    }
};
*/

// CHANGES:
// - Added better error handling and logging to provide detailed feedback in case of failure
export const login = async (email, password) => {
  try {
    const { data, status } = await axios.post(`user/token/`, {
      email,
      password,
    });

    if (status === 200) {
      setAuthUser(data.access, data.refresh);
    }

    return { data, error: null };
  } catch (error) {
    const errorMessage = error.response?.data?.detail || "Something went wrong";
    console.error("Login error:", errorMessage);
    return { data: null, error: errorMessage };
  }
};

// OLD CODE

/*
// No changes in the register function, but logging could also be added for debugging
export const register = async (full_name, email, password, password2) => {
    try {
        const { data } = await axios.post(`user/register/`, {
            full_name,
            email,
            password,
            password2,
        });

        await login(email, password);
        return { data, error: null };
    } catch (error) {
        return {
            data: null,
            error: `${error.response.data.full_name} - ${error.response.data.email}` || "Something went wrong",
        };
    }
};
*/

// CHANGES:
// - No significant changes to this function. Left as is for now
export const register = async (full_name, email, password, password2) => {
  try {
    const { data } = await axios.post(`user/register/`, {
      full_name,
      email,
      password,
      password2,
    });

    await login(email, password);
    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error:
        `${error.response.data.full_name} - ${error.response.data.email}` ||
        "Something went wrong",
    };
  }
};

// OLD CODE COMMENTED WITH EXPLANATIONS

/*
// The original logout function is fine. No need for changes here
export const logout = () => {
    Cookie.remove("access_token");
    Cookie.remove("refresh_token");
    useAuthStore.getState().setUser(null);
};
*/

// No changes needed for `logout`
export const logout = () => {
  Cookie.remove("access_token");
  Cookie.remove("refresh_token");
  useAuthStore.getState().setUser(null);
};

// OLD CODE

/*
// Issue: getRefreshToken was called but not awaited, potentially leading to invalid tokens being used
export const setUser = async () => {
    const access_token = Cookie.get("access_token");
    const refresh_token = Cookie.get("refresh_token");

    if (!access_token || !refresh_token) {
        return;
    }

    if (isAccessTokenExpired(access_token)) {
        const response = getRefreshToken(refresh_token);  // MISSING await!
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(access_token, refresh_token);
    }
};
*/

// CHANGES:
// - Added `await` to `getRefreshToken` to ensure token refresh is properly awaited
export const setUser = async () => {
  const access_token = Cookie.get("access_token");
  const refresh_token = Cookie.get("refresh_token");

  if (!access_token || !refresh_token) {
    console.log("Tokens do not exist");
    return;
  }

  if (isAccessTokenExpired(access_token)) {
    //const response = await getRefreshedToken(refresh_token); // Properly awaited
    //From ChatGPT
    const response = await getRefreshedToken();
    console.log("Here I am, response:", response);
    //setAuthUser(response.data.access, response.data.refresh); // Corrected access of token data
    setAuthUser(response.access, response.refresh);
  } else {
    setAuthUser(access_token, refresh_token);
  }
};

// OLD CODE

/*
// The original function could lead to invalid tokens being stored without checks
export const setAuthUser = (access_token, refresh_token) => {
    Cookie.set("access_token", access_token, {
        expires: 1,
        secure: true,
    });

    Cookie.set("refresh_token", refresh_token, {
        expires: 7,
        secure: true,
    });

    const user = jwt_decode(access_token) ?? null;

    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};
*/

// CHANGES:
// - Added checks to ensure that tokens are valid before setting them in cookies
export const setAuthUser = (access_token, refresh_token) => {
  if (access_token && refresh_token) {
    Cookie.set("access_token", access_token, {
      expires: 1,
      secure: true,
    });

    Cookie.set("refresh_token", refresh_token, {
      expires: 7,
      secure: true,
    });

    const user = access_token ? jwt_decode(access_token) : null; // Ensure valid token is passed
    if (user) {
      useAuthStore.getState().setUser(user);
    }
  } else {
    console.error("Invalid tokens, could not set user.");
  }
  useAuthStore.getState().setLoading(false);
};

// OLD CODE

/*
// The original token refresh function lacked error handling
export const getRefreshToken = async () => {
    const refresh_token = Cookie.get("refresh_token");
    const response = await axios.post(`user/token/refresh/`, {
        refresh: refresh_token,
    });
    return response;
};
*/

// CHANGES:
// - Added error handling in case the token refresh fails (e.g., expired refresh token)

// OLD CODE
export const getRefreshedToken = async () => {
  try {
    const refresh_token = Cookie.get("refresh_token");
    const response = await axios.post(`user/token/refresh/`, {
      refresh: refresh_token,
    });
    return response.data;
  } catch (error) {
    console.error("Hi!! Failed to refresh token:", error);
    logout(); // Log the user out if refresh fails
    throw error;
  }
};
/*
// The original isAccessTokenExpired function is mostly fine, but the check should be thorough
export const isAccessTokenExpired = (access_token) => {
    try {
        const decodedToken = jwt_decode(access_token);
        return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
        console.log(error);
        return true;
    }
};
*/

// No changes needed here, but made sure that any error during decoding defaults to token expiration
export const isAccessTokenExpired = (access_token) => {
  try {
    const decodedToken = jwt_decode(access_token);
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Consider token expired if decoding fails
  }
};
