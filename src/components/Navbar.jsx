import AuthModalContext from "@/context/AuthModalContext";
import { Fragment, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import AuthNavbarItem from "./AuthNavbarItem";
import GuestNavItem from "./navigation/GuestNavItem/GuestNavItem";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { setAuthForm, setShowAuthModal } = useContext(AuthModalContext);
  const accessToken = useSelector((state) => state.auth.accessToken);
  const navigate = useNavigate();

  const onSimulatorClick = () => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    navigate("/simulator");
  };
  const onMapDrawingClick = () => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    navigate("/map-drawing");
  };

  const onToolPageClick = () => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    alert("Coming soon");
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <div className="flex">
        <img
          src={logo}
          alt="effeg"
          className="w-[200px] h-[168px] mr-10 cursor-pointer"
          onClick={() => navigate(`/`)}
        />
        <button
          onClick={onSimulatorClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden md:block mr-10"
        >
          Simulator
        </button>
        <button
          onClick={onMapDrawingClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden md:block mr-10"
        >
          Map Drawing
        </button>
        <button
          onClick={onToolPageClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden md:block"
        >
          Tool Page
        </button>
      </div>

      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <GuestNavItem
            href={nav.href}
            title={nav.title}
            lastItem={index === navLinks.length - 1}
            key={index}
            links={nav.links}
            setActive={setActive}
            id={nav.id}
            active={active}
          />
        ))}
        <AuthNavbarItem />
      </ul>

      <div className="md:hidden flex flex-1 justify-end items-center relative">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-8 right-0 my-2 min-w-[140px] rounded-xl sidebar z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <Fragment key={nav.id}>
                {(nav.links || []).length === 0 && (
                  <li
                    key={nav.id}
                    className={`font-poppins font-medium cursor-pointer text-[16px] mb-4 relative ${
                      active === nav.title ? "text-white" : "text-dimWhite"
                    }`}
                    onClick={() => setActive(nav.title)}
                  >
                    <Link to={nav.href}>{nav.title}</Link>
                  </li>
                )}
                {(nav.links || []).length !== 0 && (
                  <>
                    {nav.links.map((link) => (
                      <li
                        key={link.href}
                        className={`font-poppins font-medium cursor-pointer text-[16px] mb-4 relative ${
                          active === nav.title ? "text-white" : "text-dimWhite"
                        }`}
                      >
                        <Link to={link.href}>{link.title}</Link>
                      </li>
                    ))}
                  </>
                )}
              </Fragment>
            ))}
            <li className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] mb-4">
              <button onClick={onSimulatorClick}>Simulator</button>
            </li>
            <li className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] mb-4 cursor-pointer">
              <p onClick={onMapDrawingClick}>Map Drawing</p>
            </li>
            <li className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] mb-4">
              <button onClick={onToolPageClick}>Tool Page</button>
            </li>
            <AuthNavbarItem small />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
