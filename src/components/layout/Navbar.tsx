import { NavLink } from "../ui/NavLink"

export const Navbar = () => {
    return (
        <div className="hidden md:flex gap-4 justify-self-center justify-between">
            <NavLink
                href="#"
                variant="primary"
                pill="true"
            >
                Início
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
                pill="true"
            >
                Sobre
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
                pill="true"
            >
                Serviços
            </NavLink>
            <NavLink
                href="#"
                variant="primary"
                pill="true"
            >
                Contato
            </NavLink>
        </div>
    )
}