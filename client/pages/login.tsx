import Button from "@/components/Button";
import Input from "@/components/Input";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter, BsApple } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = useCallback(async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);
    if (data.error)
      return toast.error(data.error, {
        duration: 2000,
        style: {
          background: "red",
          color: "#fff",
        },
      });
    toast.success("Logged in successfully", {
      style: {
        background: "green",
        color: "#fff",
      },
    });
    localStorage.setItem("token", data.token);
    router.push("/");
  }, [email, password, router, toast]);

  return (
    <div className="bg-twitterBlueGrayish h-screen flex items-center justify-center">
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
          <h1 className="text-3xl font-bold mb-8">Sign in to Twitter</h1>
          <Button label="Sign in with Google" Icon={FcGoogle} outlined />
          <Button label="Sign in with Apple" Icon={BsApple} outlined />
          <div className="flex items-center justify-center my-4">
            <div className="border-b border-zinc-600 w-2/3"></div>
            <p className="mx-4">or</p>
            <div className="border-b border-zinc-600 w-2/3"></div>
          </div>

          <div className="mb-4">
            <Input
              id="email"
              label="Email"
              type="email"
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
          </div>
          <Button label="Next" outlined onClick={handleLogin} type="submit" />
          <Button label="Forgot password?" />

          <div className=" mt-12">
            <p className="text-sm text-zinc-400 mb-10">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-twitterBlue hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
