import { useCallback, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-hot-toast";

interface CreateProfileProps {
  user: any;
  onClick: () => void;
}

const CreateProfile: React.FC<CreateProfileProps> = ({ user, onClick }) => {
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");

  const handleCreateProfile = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/createProfile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bio, location, website }),
    });
    const data = await res.json();
    if (data.error) {
      toast.error(data.error, {
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
    if (data.success) {
      toast.success(data.success, {
        style: {
          background: "green",
          color: "#fff",
        },
      });
    }
    window.location.reload();
  }, [bio, location, website, toast]);
  return (
    <div className="flex flex-col items-center bg-black md:rounded-2xl w-full h-screen md:h-auto md:w-8/12 lg:w-6/12 xl:w-5/12 pb-20">
      <div className="flex items-center justify-between w-full px-5 py-5">
        <div className="flex items-center gap-x-4 ">
          <AiOutlineClose
            className="text-2xl cursor-pointer"
            onClick={onClick}
          />
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>

        <Button label="Save" isColor small onClick={handleCreateProfile} />
      </div>
      <div className="w-6/12 pt-5">
        <div className="flex items-center justify-center w-full">
          <img src="user.png" alt="avatar" className="w-20 h-20" />
        </div>
        <Input id="name" value={user?.name} label="Name" />
        <Input id="username" value={user?.username} label="Username" />
        <Input
          id="bio"
          value={user?.Profile?.bio}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setBio(e.target.value)
          }
          label="Bio"
        />
        <Input
          id="location"
          value={user?.Profile?.location}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocation(e.target.value)
          }
          label="Location"
        />
        <Input
          id="website"
          value={user?.Profile?.website}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setWebsite(e.target.value)
          }
          label="Website"
        />
      </div>
    </div>
  );
};

export default CreateProfile;
