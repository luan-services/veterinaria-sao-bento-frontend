import { NavLink } from "../ui/NavLink"

export const Navbar = () => {
    return (
        <div className="hidden md:flex gap-4 justify-self-center justify-between">
            <NavLink
                href="#"
                variant="primary"
            >
                Início
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
            >
                Sobre
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
            >
                Serviços
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
            >
                Contato
            </NavLink>
        </div>
    )
}