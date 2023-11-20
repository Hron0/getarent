import { Link } from "react-router-dom"
import logo from "../../assets/logo.svg"
import useWindowDimensions from "@/hooks/useWindowDimensions"

const Navbar = () => {
/*   const { width } = useWindowDimensions() */

  return (
    <nav className="flex flex-row justify-between px-[2%] pt-[15px]">
      <img src={logo} alt="Logo" width={50} height={50} />
      <div className="flex flex-row items-center">
        <div className="flex flex-row gap-4 items-center">
          <Link to="/park">Сдать авто в аренду</Link>
          <Link to="/">О компании</Link>
          <Link to="/blog">Блог</Link>
        </div>
      </div>

    </nav>
  )
}

export default Navbar