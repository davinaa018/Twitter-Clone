import Button from "@/components/Button";
import Input from "@/components/Input";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter, BsApple } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
const Login = () => {
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
          <form>
            <div className="mb-4">
              <Input
                id="email"
                label="Phone, email, or username"
                type="email"
                value=""
              />
            </div>
            <Button label="Next" outlined />
            <Button label="Forgot password?" />
          </form>

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
