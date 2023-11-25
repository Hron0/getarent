import { Link } from "react-router-dom"
import cl from "./navModal.module.css"
import { Separator } from "@/components/ui/separator"
import { Label } from "@radix-ui/react-label"

interface ModalProps {
    active: Boolean;
    setActive: Function;
  }

const NavModal = ({ active, setActive }: ModalProps) => {


    return (
        <div 
        className={active ? `${cl.modalBg} ${cl.modalBgActive}` : cl.modalBg}
        onClick={() => setActive(false)}
        >
            <div 
            className={active ? `${cl.modalContent} ${cl.modalContentActive}` : cl.modalContent}
            onClick={(e) => e.stopPropagation()}
            >
                
                <Link to="/park" className="text-black hover:underline text-xl">Сдать авто в аренду</Link>
                <Separator className="my-1"/>
                <Link to="/" className="text-black hover:underline text-xl">О компании</Link>
                <Separator className="my-1"/>
                <Link to="/blog" className="text-black hover:underline text-xl">Блог</Link>
                <Separator className="my-1"/>
                <Label className="text-black hover:underline text-xl pb-1">Горячая линия:</Label>
                <Label className="text-black hover:underline text-xl">+7 987 654 22 22</Label>
            </div>
        </div>
    )
}

export default NavModal