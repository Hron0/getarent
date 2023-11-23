import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { FaRegClock } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { Label } from "../ui/label";


const Navbar = () => {
  /*   const { width } = useWindowDimensions() */

  return (
    <nav className="flex flex-row justify-between px-[2%] pt-[15px] w-full">
      <img src={logo} alt="Logo" width={50} height={50} />
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row gap-4 items-center border-r-2 border-black pr-4">
          <Link to="/park" className="text-black hover:underline">Сдать авто в аренду</Link>
          <Link to="/" className="text-black hover:underline">О компании</Link>
          <Link to="/blog" className="text-black  hover:underline">Блог</Link>
        </div>
        <div className="flex flex-row items-center gap-4 pl-4">
          <FaRegClock className="text-black" />
          <Label className="text-black hover:underline">+7 987 654 32 11</Label>
          <Link to={"/"}>
            <CiCircleQuestion className="text-black text-xl hover:underline" />
          </Link>
          <div className="flex flex-row items-center">
            <Link to={"/login"} className="text-black font-bold hover:underline">
              Вход
            </Link>
            <Label className="text-black px-1"> / </Label>
            <Link to={"/register"} className="text-black font-bold hover:underline">
              Регистрация
            </Link>
          </div>

        </div>
      </div>

    </nav>
  )
}

export default Navbar