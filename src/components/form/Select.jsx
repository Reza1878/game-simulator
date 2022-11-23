import React, { useState, useMemo, useEffect, Fragment } from "react";
import * as t from "prop-types";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDown } from "react-feather";
import clsx from "clsx";
import { Label } from ".";
import { Text } from "../common";

function Select({
  options,
  defaultValue,
  renderOptions,
  fetchItems,
  label,
  onChange,
  name,
  id,
  register,
  error,
  helperText,
  className,
  getOptionSelected,
}) {
  const [value, setValue] = useState(defaultValue);
  const [items, setItems] = useState([]);
  const initialValue = useMemo(() => {
    if (!getOptionSelected) return null;
    if (options) return options.filter((item) => getOptionSelected(item))[0];
    return items.filter((item) => getOptionSelected(item))[0];
  }, [getOptionSelected, items]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await fetchItems();
      if (!active) return;
      const { data } = response;
      setItems(data);
    };

    if (fetchItems) {
      fetchData();
    }

    return () => {
      active = false;
    };
  }, [fetchItems]);

  return (
    <>
      <input id={id} type="hidden" name={name} {...register(name)} />
      <Listbox
        value={value || initialValue || ""}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      >
        <div className={clsx("relative mt-1", className)}>
          <Label error={error}>{label}</Label>
          <Listbox.Button
            className={clsx(
              "relative w-full cursor-default overflow-hidden rounded-md bg-white text-left focus:outline-none border px-2 py-1",
              { "border-red-500": error }
            )}
          >
            <span className={clsx("block truncate", { "text-red-500": error })}>
              {value
                ? renderOptions(value)
                : initialValue
                ? renderOptions(initialValue)
                : "-"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={clsx(
                  { "text-gray-400": !error },
                  { "text-red-500": error }
                )}
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {error && <Text className="text-red-500">{helperText}</Text>}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              <>
                <Listbox.Option
                  className={({ active }) =>
                    clsx(
                      "relative cursor-pointer select-none py-2 px-4",
                      { "bg-primary text-white": active },
                      { "text-gray-900": !active }
                    )
                  }
                  value={null}
                >
                  {({ active }) => (
                    <>
                      <span
                        className={clsx(
                          "block truncate",
                          {
                            "font-medium": active,
                          },
                          { "font-normal": !active }
                        )}
                      >
                        -
                      </span>
                    </>
                  )}
                </Listbox.Option>
                {(options ?? items).map((opt, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      clsx(
                        "relative cursor-pointer select-none py-2 px-4",
                        { "bg-primary text-white": active },
                        { "text-gray-900": !active }
                      )
                    }
                    value={opt}
                  >
                    {({ active }) => (
                      <>
                        <span
                          className={clsx(
                            "block truncate",
                            {
                              "font-medium": active,
                            },
                            { "font-normal": !active }
                          )}
                        >
                          {renderOptions(opt)}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </>
  );
}

Select.propTypes = {
  options: t.array,
  defaultValue: t.object,
  renderOptions: t.func,
  fetchItems: t.func,
  label: t.string,
  onChange: t.func,
  name: t.string,
  id: t.string,
  error: t.bool,
  helperText: t.string,
  register: t.func,
  getOptionSelected: t.func,
};
Select.defaultProps = {
  options: null,
  defaultValue: null,
  fetchItems: null,
  renderOptions: (opt) => opt,
  label: "",
  onChange: () => {},
  name: "",
  error: false,
  helperText: "",
  valueKey: null,
  register: () => ({}),
  getOptionSelected: null,
};

export default Select;
