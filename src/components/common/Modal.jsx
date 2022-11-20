import React, { Fragment } from "react";
import * as t from "prop-types";
import { Transition, Dialog } from "@headlessui/react";
import clsx from "clsx";

function Modal({ open = false, onClose = () => {}, children, className = "" }) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog className="relative z-50" open={open} as="div" onClose={onClose}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            className="fixed inset-0 bg-black bg-opacity-70"
            aria-hidden="true"
          />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  "bg-white w-full max-w-md p-4 rounded-lg transform transition-all",
                  className
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
Modal.propTypes = {
  open: t.bool,
  onClose: t.func,
  children: t.node,
};

export default Modal;
