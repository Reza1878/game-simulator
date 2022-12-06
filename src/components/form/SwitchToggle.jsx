import { Switch } from "@headlessui/react";
import clsx from "clsx";
import React from "react";

function SwitchToggle({
  checked = false,
  onChange = () => {},
  label,
  register = null,
  name,
}) {
  const registerAttr = register ? register(name) : {};
  return (
    <>
      <input type="hidden" {...registerAttr} />
      <Switch.Group as="div" className="mb-3">
        <div className="flex items-center">
          <Switch
            checked={checked}
            onChange={onChange}
            className={clsx(
              "relative inline-flex h-6 w-11 items-center rounded-full outline-none",
              [checked && "bg-primary border"],
              [!checked && "bg-gray-200"]
            )}
          >
            <span
              className={clsx(
                "transition-all inline-block h-4 w-4 rounded-full bg-white translate-x-1",
                [checked && "translate-x-6"]
              )}
            />
          </Switch>
          <Switch.Label className="ml-2 cursor-pointer select-none">
            {label}
          </Switch.Label>
        </div>
      </Switch.Group>
    </>
  );
}

export default SwitchToggle;
