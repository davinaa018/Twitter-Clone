import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { FiMessageCircle, FiUpload } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineRetweet } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";

interface Tweet {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
    name: string;
    email: string;
  };
}

const TweetCard = ({ isProfile, user }: any) => {
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const handleGetTweets = useCallback(async () => {
    if (isProfile) {
      const res = await fetch(
        `http://localhost:8080/api/getUserTweets?username=${user?.username}`,
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setTweets(data.tweets);
    } else {
      const res = await fetch("http://localhost:8080/api/getTweets", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setTweets(data.tweets);
    }
  }, [setTweets, isProfile, user?.username]);

  useEffect(() => {
    handleGetTweets();
  }, [handleGetTweets, isProfile, user?.username]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full text-white">
        {tweets?.map((tweet: any) => (
          <div key={tweet.id}>
            <div className="flex items-center gap-3 pb-2 pl-2">
              <Link href={`/${tweet?.user?.username}`}>
                <img
                  src="user.png"
                  alt="avatar"
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
              </Link>
              <div className="flex flex-col w-11/12">
                <div className="flex justify-between items-center">
                  <Link
                    href={`/${tweet?.user?.username}`}
                    className="flex gap-2 mt-4"
                  >
                    <h1 className="font-bold text-[12px] md:text-base">
                      {tweet.user.name}
                    </h1>
                    <p className="text-zinc-600 text-sm md:text-base">
                      @{tweet.user.username}
                    </p>
                    <p className="text-zinc-600 text-sm md:text-base">
                      {tweet.createdAt.split("T")[0]}
                    </p>
                  </Link>

                  <div className="px-2 py-2 rounded-full hover:bg-zinc-800/60 transition cursor-pointer relative">
                    <BsThreeDots
                      size={20}
                      className="text-zinc-400 hover:text-twitterBlue transition  "
                    />
                  </div>
                </div>
                <p className="text-sm md:text-base">{tweet.description}</p>
                <div className="pt-2 flex items-center w-8/12 text-zinc-600 ">
                  <FiMessageCircle className="w-5 h-5 flex-grow hover:text-twitterBlue cursor-pointer" />
                  <AiOutlineRetweet className="w-5 h-5 flex-grow hover:text-green-500 cursor-pointer" />
                  <AiOutlineHeart className="w-5 h-5 flex-grow hover:text-red-500 cursor-pointer" />
                  <FiUpload className="w-5 h-5 flex-grow hover:text-twitterBlue cursor-pointer" />
                </div>
              </div>
            </div>
            <hr className="border-[.5px] border-white/20 w-full " />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TweetCard;
