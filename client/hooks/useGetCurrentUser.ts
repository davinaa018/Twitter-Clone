export const getCurrentUser = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch("http://localhost:8080/api/getCurrentUser", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await res.json();
  return data?.user;
};
