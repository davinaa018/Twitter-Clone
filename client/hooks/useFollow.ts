export const followUser = async (username: string) => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const res = await fetch(
    `http://localhost:8080/api/followUser?username=${username}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const data = await res.json();
  return data;
};
