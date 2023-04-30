import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineGift } from "react-icons/ai";
import { TbCalendarTime } from "react-icons/tb";
import { BsImage, BsEmojiSmile } from "react-icons/bs";
import Button from "./Button";
const TweetArea = () => {
  return (
    <div className="flex w-full gap-2">
      <div className="ml-2">
        <img
          src="https://pbs.twimg.com/profile_images/1441164208953082881/6X0Z8Y5-_400x400.jpg"
          alt="profile"
          className="w-12 h-12 rounded-full border border-white"
        />
      </div>
      {/* Textarea for tweets */}
      <div className="flex flex-col w-full ">
        <textarea
          name="tweet"
          id="tweet"
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
          <Button label="Tweet" isColor small />
        </div>
      </div>
    </div>
  );
};

export default TweetArea;
