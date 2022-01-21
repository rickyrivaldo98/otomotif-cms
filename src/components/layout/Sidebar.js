import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.style.scss"

const Sidebar = (props) => {
    const [collapseShow, setCollapseShow] = useState("hidden");
    const [activeTab, setActiveTab] = useState("home");

    useEffect(() => {
        window.location.href.indexOf("/DataPage") !== -1 ? setActiveTab("data") : setActiveTab("home");
        // window.location.href.indexOf("/EditDataPage/") !== -1 ? setActiveTab("data") : setActiveTab("home");

    });

    const handleTab1 = () => {
        setActiveTab("home");
    };
    const handleTab2 = () => {
        setActiveTab("data");
    };
    return (
        <>
            {props.collapse === false ?
                <>
                    <nav className="sidebar-container">
                        <div className="sidebar-content">
                            <button
                                className="sidebar-mobile-button"
                                type="button"
                                onClick={() => setCollapseShow("bg-white m-2 py-3 px-6")}
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                            <Link
                                className="sidebar-title"
                                to="/"
                            >
                                CMS OTOMOTIF
                            </Link>
                            <div
                                className={
                                    "sidebar-mobile-container " +
                                    collapseShow
                                }
                            >
                                {/* Collapse header */}
                                <div className="sidebar-mobile-content">
                                    <div className="flex flex-wrap">
                                        <div className="w-6/12">
                                            <Link
                                                className="sidebar-mobile-title"
                                                to="/"
                                            >
                                                CMS OTOMOTIF
                                            </Link>
                                        </div>
                                        <div className="w-6/12 flex justify-end">
                                            <button
                                                type="button"
                                                className="sidebar-mobile-close"
                                                onClick={() => setCollapseShow("hidden")}
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Heading */}
                                <h6 className="menu-title">
                                    Menu
                                </h6>
                                {/* Navigation */}

                                <ul className="menu-container">
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "options-menu " +
                                                (activeTab === "home"
                                                    ? "selected"
                                                    : "unselected")
                                            }
                                            to="/"
                                            onClick={handleTab1}
                                        >
                                            <i
                                                className={
                                                    "fas fa-home mr-2 text-sm " +
                                                    (activeTab === "home" ? "opacity-75" : "text-gray-300")
                                                }
                                            ></i>
                                            Home
                                        </Link>
                                    </li>
                                    <li className="items-center">
                                        <Link
                                            className={
                                                "options-menu " +
                                                (window.location.href.indexOf("/DataPage") !== -1
                                                    ? "selected"
                                                    : "unselected")
                                            }
                                            to="/DataPage"
                                            onClick={handleTab2}
                                        >
                                            <i
                                                className={
                                                    "fas fa-list mr-2 text-sm " +
                                                    (window.location.href.indexOf("/DataPage") !== -1
                                                        ? "opacity-75"
                                                        : "text-gray-300")
                                                }
                                            ></i>
                                            List Data Mobil
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </>
                :
                <>
                </>}
        </>
    );
}

export default Sidebar;