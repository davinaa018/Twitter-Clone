import { getCurrentUser } from "./useGetCurrentUser";

export const getUserByUsername = async (username: string) => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  if (!username) {
    const user = await getCurrentUser();
    username = user?.username;
  }

  const res = await fetch(
    `http://localhost:8080/api/getUserByUsername?username=${username}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  return data;
};
