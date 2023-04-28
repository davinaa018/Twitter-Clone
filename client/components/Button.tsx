import { IconType } from "react-icons";

interface ButtonProps {
  onClick?: any;
  type?: "button" | "submit" | "reset";
  label: string;
  Icon?: IconType;
  disabled?: boolean;
  outlined?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  label,
  Icon,
  disabled,
  outlined,
}) => {
  return (
    <button
      className={`
        w-full
        flex
        items-center
        justify-center
        rounded-full
        py-3
        px-4
        text-sm md:text-base
        transition
        duration-200
        ease-in-out
        focus:outline-none
        disabled:opacity-50
        disabled:cursor-not-allowed
        my-4
       ${
         outlined
           ? "bg-white text-black hover:bg-zinc-200"
           : "border border-zinc-600 bg-black text-white hover:bg-zinc-800/60"
       }
    `}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {label}
    </button>
  );
};

export default Button;
