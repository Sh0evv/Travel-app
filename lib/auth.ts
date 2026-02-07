// lib/auth.ts
export const setToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};

export const isLoggedIn = () => {
  return !!getToken();
};

export const logout = () => {
  localStorage.removeItem("access_token");
};
