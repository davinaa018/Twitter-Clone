import Button from "@/components/Button";
import Input from "@/components/Input";
import { BsTwitter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

const CreateAccountModal = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegisterUser = useCallback(async () => {
    if (!name || !username || !email || !password) {
      return toast.error("Please fill in all fields", {
        duration: 2000,
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
    const res = await fetch("http://localhost:8080/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, username, email, password }),
    });
    const data = await res.json();
    if (data.error) {
      return toast.error(data.error, {
        duration: 2000,
        style: {
          background: "red",
          color: "#fff",
        },
      });
    }
    if (data.user) {
      localStorage.setItem("token", data.token);
      toast.success("Account created", {
        duration: 2000,
        style: {
          background: "green",
          color: "#fff",
        },
      });
    }

    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
    router.push("/");
  }, [name, username, email, password, toast]);

  return (
    <div
      className="
        bg-black 
        w-full 
        h-screen
        md:h-auto
        md:w-9/12 
        lg:w-7/12 
        xl:w-5/12 
        md:rounded-lg 
        shadow-lg 
        flex 
        flex-col 
        items-center
        p-8 
        "
    >
      <div className="flex items-center justify-start w-full mb-8">
        <Link href="/">
          <AiOutlineClose size={25} className="cursor-pointer" />
        </Link>
        <div className="flex items-center justify-center w-full">
          <BsTwitter size={35} />
        </div>
      </div>
      <div className="md:w-[60%] lg:w-[60%] xl:w-[55%]">
        <h1 className="text-3xl font-bold mb-8">Create your account</h1>
        <Input
          id="name"
          label="Name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
        />
        <Input
          id="username"
          label="Username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <Input
          id="email"
          label="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <Button label="Create account" outlined onClick={handleRegisterUser} />

        <p
          className="
            text-zinc-400
            text-sm
            mt-8
            mb-4
            "
        >
          By signing up, you agree to the{" "}
          <Link href="/" className="text-twitterBlue hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/" className="text-twitterBlue hover:underline">
            Privacy Policy
          </Link>
          , including{" "}
          <Link href="/" className="text-twitterBlue hover:underline">
            Cookie Use
          </Link>
        </p>

        <div className=" mt-12">
          <p className="text-sm text-zinc-400 mb-10">
            Have an account already?{" "}
            <Link href="/login" className="text-twitterBlue hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccountModal;
