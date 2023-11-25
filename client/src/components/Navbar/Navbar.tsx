import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useWindowDimensions from "@/hooks/useWindowDimensions"
import { FaRegClock } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { IoMdMenu } from "react-icons/io";
import { Label } from "../ui/label";
import { useIsAuthenticated } from 'react-auth-kit';
import { useState } from "react";
import NavModal from "./navMenu/NavModal";

/* TODO add shadCN AspectRaiot component on first image */

const Navbar = () => {
  const [modal, setModal] = useState(false)
  const { width } = useWindowDimensions()
  const isAuthenticated = useIsAuthenticated()
  let mobile: boolean = width < 770
  console.log(isAuthenticated())

  return (
    <nav className="flex flex-row justify-between px-[2%] pt-[15px] w-full relative">
      <img src={logo} alt="Logo" width={50} height={50} />
      {mobile
        ?
        <div className="flex flex-row-reverse gap-2 items-center">
          <button
            className="flex items-center justify-center w-[50px] h-[50px]"
            onClick={() => setModal(!modal)}
          >
            <IoMdMenu className="text-black w-[25px] h-[25px]" />
          </button>
          <Link to="/profile">
            <CgProfile className="text-black text-3xl" />
          </Link>
        </div>
        :
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
              <FaRegQuestionCircle className="text-black text-xl hover:underline" />
            </Link>
            {isAuthenticated()
              ?
              <div className="">
                <Link to="/profile">
                  <CgProfile className="text-black text-3xl" />
                </Link>
              </div>
              :
              <div className="flex flex-row items-center">
                <Link to={"/login"} className="text-black font-bold hover:underline">
                  Вход
                </Link>
                <Label className="text-black px-1"> / </Label>
                <Link to={"/register"} className="text-black font-bold hover:underline">
                  Регистрация
                </Link>
              </div>
            }


          </div>
        </div>
      }

      <NavModal active={modal} setActive={setModal} />
    </nav>
  )
}

export default Navbar