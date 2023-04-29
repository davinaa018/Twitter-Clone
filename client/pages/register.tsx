import Button from "@/components/Button";
import { FcGoogle } from "react-icons/fc";
import { BsTwitter, BsApple } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";
import CreateAccountModal from "@/components/CreateAccount";
import { useCallback, useState } from "react";
const Login = () => {
  const [showCreateAccountModal, setShowCreateAccountModal] = useState(false);

  const toggleCreateAccountModal = useCallback(() => {
    setShowCreateAccountModal((prev) => !prev);
  }, []);

  return (
    <div className="bg-twitterBlueGrayish h-screen flex items-center justify-center relative">
      <div
        className={`
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
        ${showCreateAccountModal ? "hidden" : ""}
        `}
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
          <h1 className="text-3xl font-bold mb-8">Join Twitter Today</h1>
          <Button label="Sign in with Google" Icon={FcGoogle} outlined />
          <Button label="Sign in with Apple" Icon={BsApple} outlined />
          <div className="flex items-center justify-center my-4">
            <div className="border-b border-zinc-600 w-2/3"></div>
            <p className="mx-4">or</p>
            <div className="border-b border-zinc-600 w-2/3"></div>
          </div>
          <Button
            label="Create account"
            outlined
            onClick={toggleCreateAccountModal}
          />

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
      {showCreateAccountModal && <CreateAccountModal />}
    </div>
  );
};

export default Login;
