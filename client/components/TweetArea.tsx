import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineGift } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import Button from "./Button";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
const TweetArea = () => {
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleCreateTweet = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/createTweet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        description,
        authorizationToken: localStorage.getItem("token"),
      }),
    });
    const data = await res.json();
    if (data.error)
      return toast.error(data.error, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    toast.success("Tweet created successfully", {
      style: {
        background: "green",
        color: "#fff",
      },
    });
    setDescription("");

    router.push("/");
  }, [description, router, toast]);

  return (
    <div className="flex w-full gap-2">
      <div className="ml-2">
        <img src="user.png" alt="profile" className="w-11 h-10 rounded-full " />
      </div>
      {/* Textarea for tweets */}
      <div className="flex flex-col w-full ">
        <textarea
          name="tweet"
          id="tweet"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          cols={30}
          rows={10}
          placeholder="What's happening?"
          className="h-20 px-2 py-1 rounded-lg bg-zinc-800 text-white focus:outline-none pl-4 mr-2"
        ></textarea>
        <div className="flex items-center justify-between mr-2">
          <div className="flex items-center gap-x-4 ">
            <BsImage size={20} className="text-twitterBlue cursor-pointer" />
            <AiOutlineGift
              size={20}
              className="text-twitterBlue cursor-pointer"
            />
            <HiOutlineLocationMarker
              size={20}
              className="text-twitterBlue cursor-pointer"
            />
            <TbCalendarTime
              size={20}
              className="text-twitterBlue cursor-pointer"
            />

            <BsEmojiSmile
              size={20}
              className="text-twitterBlue cursor-pointer"
            />
          </div>
          <Button label="Tweet" isColor small onClick={handleCreateTweet} />
        </div>
      </div>
    </div>
  );
};

export default TweetArea;
