import { IconType } from "react-icons";

interface ButtonProps {
  onClick?: any;
  type?: "button" | "submit" | "reset";
  label: string;
  Icon?: IconType;
  disabled?: boolean;
  outlined?: boolean;
  isColor?: boolean;
  small?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  type,
  label,
  Icon,
  disabled,
  outlined,
  isColor,
  small,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        flex
        items-center
        justify-center
        rounded-full
        text-sm md:text-base
        transition
        duration-200
        ease-in-out
        focus:outline-none
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${
          small
            ? "py-2 px-3 text-xs mt-1"
            : "w-full py-3 px-4 text-sm md:text-base my-4"
        }
       ${
         outlined
           ? "bg-white text-black hover:bg-zinc-200"
           : "border border-zinc-600 bg-black text-white "
       }
       ${isColor ? "bg-twitterBlue text-white hover:bg-twitterBlue/80" : ""}
    `}
    >
      {Icon && <Icon className="w-5 h-5 mr-2" />}
      {label}
    </button>
  );
};

export default Button;
