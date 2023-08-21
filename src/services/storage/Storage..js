import data from "../../assets/data/data";

export const storeUserData = (data) => {
  localStorage.setItem("news4alluuid", data);
};

export const getUserData = () => {
  return localStorage.getItem("news4alluuid");
};

export const removeUserData = () => {
  localStorage.removeItem("news4alluuid");
};
