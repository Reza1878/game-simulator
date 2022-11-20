import React, { useEffect, useState } from "react";
import { Heart, Menu } from "react-feather";
import { Backdrop, Text } from "../common";
import AdminSidebar from "./AdminSidebar";

function AdminLayout({ children }) {
  useEffect(() => {
    document.querySelector("body")?.classList.add("bg-gray-100");
  }, []);
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="bg-gray-100 h-full w-full flex flex-col justify-between">
        <div className="flex w-full h-full" style={{ minHeight: "95vh" }}>
          <AdminSidebar open={open} />
          <menu className="lg:pl-72 w-full">
            <div className="px-12 py-10">
              <header className="block lg:hidden">
                <button onClick={() => setOpen(!open)}>
                  <Menu />
                </button>
              </header>
              {children}
            </div>
          </menu>
        </div>
        <footer className="lg:pl-72 w-full">
          <div className="flex items-center px-10">
            <Text className="opacity-70">Made with</Text>
            <span className="pl-1">
              <Heart
                fill="red"
                height={18}
                width={18}
                stroke="red"
                opacity={0.7}
              />
            </span>
          </div>
        </footer>
      </div>
      <Backdrop
        show={open}
        onClick={() => setOpen(!open)}
        className="lg:invisible"
      />
    </>
  );
}

export default AdminLayout;
