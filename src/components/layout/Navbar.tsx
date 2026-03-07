import { NavLink } from "../ui/NavLink"

export const Navbar = () => {
    return (
        <div className="hidden md:flex md:gap-2 lg:gap-4 justify-self-center justify-between">
            <NavLink
                href="#inicio"
                variant="primary"
                pill="true"
            >
                Início
            </NavLink>
            <NavLink
                href="#sobre"
                variant="primary"
                pill="true"
            >
                Sobre
            </NavLink>
            <NavLink
                href="#servicos"
                variant="primary"
                pill="true"
            >
                Serviços
            </NavLink>
            <NavLink
                href="#contato"
                variant="primary"
                pill="true"
            >
                Contato
            </NavLink>
        </div>
    )
}