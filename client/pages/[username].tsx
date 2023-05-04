import Button from "@/components/Button";
import IconBar from "@/components/IconBar";
import TrendingCard from "@/components/TrendingCard";
import { useCallback, useEffect, useState } from "react";
import { BsArrowLeft, BsStars } from "react-icons/bs";
import { AiOutlineSetting } from "react-icons/ai";
import { getCurrentUser } from "@/hooks/useGetCurrentUser";

interface User {
  id: number;
  name: string;
  email: string;
  username: string;
}

export default function Profile() {
  const [user, setUser] = useState<User>();

  const getData = useCallback(async () => {
    const user = await getCurrentUser();
    setUser(user);
  }, [setUser]);

  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/login";
    getData();
  }, [getData]);
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="hidden sm:block  sm:flex-[.2] lg:flex-[.1] xl:flex-[.6]">
        <div className="flex flex-col items-center justify-center ">
          <IconBar />
          <div className="w-full px-10 hidden xl:block">
            <Button label="Tweet" isColor />
          </div>
        </div>
      </div>

      {/* Middle */}
      <hr className="border border-white/20 h-screen" />
      <div className="flex items-start justify-center flex-1 mt-2">
        <div className="w-full flex flex-col ">
          <div className="flex items-center justify-between">
            <div className="flex items-center px-2 p-2">
              <div className="hover:bg-zinc-800 rounded-full cursor-pointer px-2 py-2">
                <BsArrowLeft size={30} />
              </div>
              <h1 className="text-white text-xl pl-4">{user?.username}</h1>
            </div>
            <BsStars size={30} className="text-twitterBlue cursor-pointer" />
          </div>
          <hr className="w-full border border-white/20" />
        </div>
      </div>

      <hr className="border border-white/20 h-screen" />
      {/* Right Side */}
      <div className="hidden md:flex justify-center md:flex-[.13] lg:flex-[.5] xl:flex-[.8] mt-2">
        <div className="w-10/12 hidden lg:flex flex-col">
          <input
            type="search"
            placeholder="Search Twitter"
            className="w-full h-10 px-2 py-1 rounded-full bg-zinc-800 text-white focus:outline-none pl-4"
          />
          <div
            className=" border 
            border-white/20 
            bg-zinc-800 
            text-white 
            mt-3 
            w-full
            flex 
            flex-col 
            rounded-lg
            "
          >
            <div className="flex flex-col justify-between">
              <div
                className="
              flex
              justify-between
              items-center
              px-4
              py-2
            "
              >
                <h1 className="text-white text-xl font-bold ">
                  Trends for you
                </h1>
                <AiOutlineSetting
                  size={23}
                  className="text-twitterBlue cursor-pointer"
                />
              </div>
              <hr className="w-full border border-zinc-500/30" />
              <TrendingCard />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
