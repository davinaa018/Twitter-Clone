import Button from "@/components/Button";
import IconBar from "@/components/IconBar";
import { useCallback, useEffect, useState } from "react";
import { BsArrowLeft, BsStars } from "react-icons/bs";
import {
  HiOutlineLocationMarker,
  HiLink,
  HiOutlineDotsHorizontal,
} from "react-icons/hi";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { useRouter } from "next/router";

import CreateProfile from "@/components/CreateProfile";
import { getUserByUsername } from "@/hooks/useGetUserByUsername";
import TweetCard from "@/components/TweetCard";
import { followUser } from "@/hooks/useFollow";

export default function Profile() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<any>();
  const [isCurrentUser, setIsCurrentUser] = useState();
  const [isFollowing, setIsFollowing] = useState(false);
  const router = useRouter();

  const handleFollow = useCallback(async () => {
    const data = await followUser(user?.username);
    setIsFollowing(data.isFollowing);
  }, [user?.username, setIsFollowing]);

  const getData = useCallback(async () => {
    const { user, isCurrentUser } = await getUserByUsername(
      router.query.username as string
    );
    setUser(user);
    setIsCurrentUser(isCurrentUser);
  }, [setUser, setIsCurrentUser, router.query.username]);

  const checkIfFollowing = useCallback(async () => {
    const { isFollowing } = await getUserByUsername(
      router.query.username as string
    );
    setIsFollowing(isFollowing);
  }, [user?.username, setIsFollowing]);

  useEffect(() => {
    getData();
    checkIfFollowing();
  }, [getData]);

  return (
    <div className="flex h-screen z-0">
      {/* Left Side */}
      {showModal && (
        <div className="absolute top-0 left-0 w-full h-screen bg-white/20 z-[1] flex justify-center items-center">
          <CreateProfile user={user} onClick={() => setShowModal(false)} />
        </div>
      )}
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
              <div
                className="hover:bg-zinc-800 rounded-full cursor-pointer px-2 py-2"
                onClick={() => router.push("/")}
              >
                <BsArrowLeft size={30} />
              </div>
              <h1 className="text-white text-xl pl-4">{user?.username}</h1>
            </div>
            <BsStars size={30} className="text-twitterBlue cursor-pointer" />
          </div>
          <hr className="w-full border border-white/20" />

          <div className="flex flex-col relative">
            <div className="h-40 w-full bg-zinc-600" />
            <hr className="w-full border border-white/20" />
            <div className="flex flex-col sm:gap-y-8 px-4">
              <div className="flex justify-end ">
                <img
                  src="user.png"
                  alt="avatar"
                  className="w-32 h-32 md:w-36 md:h-36 border-4 border-zinc-800 rounded-full absolute left-5 sm:left-10 top-[15%] "
                />
                {isCurrentUser ? (
                  <Button
                    label="Edit Profile"
                    isColor
                    small
                    onClick={() => setShowModal(true)}
                  />
                ) : (
                  <Button
                    label={isFollowing ? "Unfollow" : "Follow"}
                    outlined
                    small
                    onClick={handleFollow}
                  />
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-bold md:text-xl">{user?.name}</h1>
                <h1 className="text-gray-500 text-sm">@{user?.username}</h1>
                <p className="text-gray-500 text-sm">
                  {user?.Profile?.bio || "Add your bio"}
                </p>

                <div className="flex flex-col md:flex-row gap-x-4 gap-y-2 md:gap-y-0 mt-3">
                  <h1 className="text-gray-500 flex items-center md:justify-center gap-x-1">
                    <HiOutlineLocationMarker size={20} className="text-white" />
                    {user?.Profile?.location || "Your location"}
                  </h1>
                  <h1 className="text-gray-500 flex items-center md:justify-center gap-x-1">
                    <HiLink size={20} className="text-white" />
                    <a href={user?.Profile?.website}>
                      {user?.Profile?.website || "Your website"}
                    </a>
                  </h1>
                  <h1 className="text-gray-500 flex items-center md:justify-center gap-x-1">
                    <MdOutlineCalendarMonth size={20} className="text-white" />
                    {user?.createdAt.split("T")[0]}
                  </h1>
                </div>

                <div className="flex gap-x-4 mt-3">
                  <h1 className="text-gray-500 flex items-center justify-center gap-x-1">
                    <span className="font-bold text-white">0</span> Following
                  </h1>
                  <h1 className="text-gray-500 flex items-center justify-center gap-x-1">
                    <span className="font-bold text-white">0</span> Followers
                  </h1>
                </div>
              </div>
            </div>
            <div
              className="
              flex
              justify-between
              items-center
              px-4
              border-b
              border-white/20
              py-2
              sm:py-4
            "
            >
              <a href="#" className="font-semibold">
                Tweets
              </a>
              <a href="#" className="font-semibold">
                Tweets & replies
              </a>
              <a href="#" className="font-semibold">
                Media
              </a>
              <a href="#" className="font-semibold">
                Likes
              </a>
            </div>
            <TweetCard user={user} isProfile />
          </div>
        </div>
      </div>

      <hr className="border border-white/20 h-screen" />
      {/* Right Side */}
      <div className="hidden lg:flex justify-center md:flex-[.13] lg:flex-[.5] xl:flex-[.8] mt-2">
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
                <h1 className="font-semibold">Who to follow</h1>
                <HiOutlineDotsHorizontal size={20} className="text-white" />
              </div>
              <hr className="w-full border border-zinc-500/30" />
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between px-4">
                  <div className="flex items-center justify-center gap-3">
                    <img src="user.png" alt="avatar" className="w-10 h-10" />
                    <div className="flex flex-col">
                      <h1 className="font-semibold">User</h1>
                      <h1 className="text-gray-500">@user</h1>
                    </div>
                  </div>
                  <div className="w-4/12">
                    <Button label="Follow" outlined />
                  </div>
                  <HiOutlineDotsHorizontal
                    size={20}
                    className="text-white cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
