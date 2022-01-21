import { Link } from "react-router-dom";
import "./UserDropdown.style.scss"

const UserDropdown = () => {

    return (
        <>
            <div className="flex">
                <div className="dropdown-container">
                    <button className="button-container">
                        <div className="avatar-container"></div>
                        <div className="welcoming">Selamat Datang User</div>
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserDropdown;
