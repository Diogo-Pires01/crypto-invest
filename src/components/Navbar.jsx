import {NavLink} from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
    return (
        <nav className="navbar">
            <NavLink className="h1">Crypto<span>Invest</span></NavLink>
            <ul>
                <li>
                    <NavLink to="/wallet">Minha Carteira</NavLink>
                </li>
                <li className="button">
                    <NavLink to="/deposit">Depositar</NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default NavBar;