import React, { useState } from "react";
import {
  BiHomeCircle,
  BiHash,
  BiEnvelope,
  BiBookmark,
  BiUser,
} from "react-icons/bi";
import { IoNotificationsOutline } from "react-icons/io5";
import { RiFileList2Line } from "react-icons/ri";
import { CiCircleMore } from "react-icons/ci";
import { IconType } from "react-icons";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";

interface Icon {
  icon: IconType;
  label?: string;
  onClick: () => void;
  color?: string;
  to?: string;
}

const IconBar = () => {
  const [highlightedIndex, setHighlightedIndex] = useState(1);

  const icons: Icon[] = [
    {
      icon: BsTwitter,
      color: "twitterBlue",
      onClick: () => {},
    },
    {
      icon: BiHomeCircle,
      label: "Home",
      onClick: () => {},
      to: "/",
    },
    {
      icon: BiHash,
      label: "Explore",
      onClick: () => {},
      to: "/explore",
    },
    {
      icon: IoNotificationsOutline,
      label: "Notifications",
      onClick: () => {},
      to: "/notifications",
    },
    {
      icon: BiEnvelope,
      label: "Messages",
      onClick: () => {},
      to: "/messages",
    },
    {
      icon: BiBookmark,
      label: "Bookmarks",
      onClick: () => {},
      to: "/bookmarks",
    },
    {
      icon: RiFileList2Line,
      label: "Lists",
      onClick: () => {},
      to: "/lists",
    },
    {
      icon: BiUser,
      label: "Profile",
      onClick: () => {},
      to: "/profile",
    },
    {
      icon: CiCircleMore,
      label: "More",
      onClick: () => {},
    },
  ];

  const handleIconClick = (index: number) => {
    setHighlightedIndex(index);
  };

  return (
    <div className="flex flex-col justify-center gap-y-4 cursor-pointer relative ">
      {icons.map((icon, index) => (
        <Link
          href={icon.to || "/"}
          key={index}
          className={`flex items-center gap-4 w-full hover:bg-zinc-900 rounded-full px-5 py-3
          ${highlightedIndex === index ? "text-twitterBlue" : ""}
          `}
          onClick={() => handleIconClick(index)}
        >
          <icon.icon size={30} className={`text-${icon.color}`} />
          <p className="hidden xl:block font-semibold">{icon.label}</p>
        </Link>
      ))}
    </div>
  );
};

export default IconBar;
