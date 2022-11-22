import AuthModalContext from "@/context/AuthModalContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { close, logo, menu } from "../assets";
import { navLinks } from "../constants";
import AuthNavbarItem from "./AuthNavbarItem";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);
  const { setAuthForm, setShowAuthModal } = useContext(AuthModalContext);
  const accessToken = useSelector((state) => state.auth.accessToken);

  const onSimulatorClick = () => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    alert("Coming soon");
  };
  const onMapDrawingClick = () => {
    if (!accessToken) {
      setAuthForm("LOGIN");
      setShowAuthModal(true);
      return;
    }
    alert("Coming soon");
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
        <img src={logo} alt="feggot" className="w-[124px] h-[32px] mr-10" />
        <button
          onClick={onSimulatorClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden lg:block mr-10"
        >
          Simulator
        </button>
        <button
          onClick={onMapDrawingClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden lg:block mr-10"
        >
          Map Drawing
        </button>
        <button
          onClick={onToolPageClick}
          className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] hidden lg:block"
        >
          Tool Page
        </button>
      </div>

      <ul className="list-none md:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <a href={`#${nav.id}`}>{nav.title}</a>
          </li>
        ))}
        <AuthNavbarItem />
      </ul>

      <div className="md:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] mb-4 ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                }`}
                onClick={() => setActive(nav.title)}
              >
                <a href={`#${nav.id}`}>{nav.title}</a>
              </li>
            ))}
            <li className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] mb-4">
              <button onClick={onSimulatorClick}>Simulator</button>
            </li>
            <li className="text-dimWhite hover:text-white font-poppins font-normal text-[16px] mb-4">
              <button onClick={onMapDrawingClick}>Map Drawing</button>
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
