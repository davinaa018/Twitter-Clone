import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/login";
  });
  return <div></div>;
}
