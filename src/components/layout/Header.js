import UserDropdown from "./UserDropdown";
import "./Header.style.scss"
const Header = (props) => {
    return (
        <>
            <nav className="container-header">
                <div className="header-content">
                    <a
                        className="collapse-button"
                        href="#collapse"
                        onClick={() => props.setCollapse(!props.collapse)}
                    >
                        <div className="fas fa-bars"></div>
                    </a>
                    <ul className="user-button">
                        <div className="pr-5 far fa-envelope text-2xl"></div>
                        <div className="pr-5 far fa-bell text-2xl"></div>

                        <UserDropdown />
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Header;