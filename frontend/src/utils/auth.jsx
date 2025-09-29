import axios from 'axios';
import { baseUrl } from '../urls';

export const refreshAccessToken = async () => {
  try {
    const res = await axios.post(`${baseUrl}/user/refresh`, null, {
      withCredentials: true,
    });
    const { accessToken } = res.data;
    if (localStorage.getItem("token") === accessToken) {
      localStorage.removeItem("token");
    }
    localStorage.setItem("token", accessToken);
    return accessToken;
  } catch (err) {
    console.error("Refresh failed", err);
    return null;
  }
};
