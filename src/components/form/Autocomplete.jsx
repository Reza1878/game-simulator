import React, { useState, useMemo, useEffect, Fragment } from "react";
import * as t from "prop-types";
import { Combobox, Transition } from "@headlessui/react";
import { ChevronDown } from "react-feather";
import clsx from "clsx";
import { Label } from ".";
import { Text } from "../common";

function Autocomplete({
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
  onQueryChange,
  getOptionSelected,
}) {
  const [value, setValue] = useState(defaultValue);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  const initialValue = useMemo(() => {
    if (!getOptionSelected) return null;
    return items.filter((item) => getOptionSelected(item))[0];
  }, [getOptionSelected, items]);

  useEffect(() => {
    if (onQueryChange) {
      onQueryChange(query);
    }
  }, [onQueryChange, query]);

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      const response = await fetchItems(query);
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
  }, [query]);

  const filteredOptions = useMemo(() => {
    if (items) return items;

    if (!options) return [];

    return query === ""
      ? options
      : options.filter((opt) =>
          renderOptions(opt)
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  }, [options, query, items]);

  return (
    <>
      <input id={id} type="hidden" name={name} {...register(name)} />
      <Combobox
        value={value || initialValue || ""}
        onChange={(val) => {
          setValue(val);
          onChange(val);
        }}
      >
        <div className="relative mt-1">
          <Label error={error}>{label}</Label>
          <div className="relative w-full cursor-default overflow-hidden rounded-md bg-white text-left focus:outline-none">
            <Combobox.Input
              className={clsx(
                "w-full border rounded-md py-1 px-2 focus:outline-none",
                {
                  "border-gray-300": !error,
                  "border-red-500": error,
                }
              )}
              displayValue={renderOptions}
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDown
                className={clsx(
                  { "text-gray-400": !error },
                  { "text-red-500": error }
                )}
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          {error && <Text className="text-red-500">{helperText}</Text>}
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50">
              {filteredOptions.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  No data available
                </div>
              ) : (
                <>
                  <Combobox.Option
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
                  </Combobox.Option>
                  {filteredOptions.map((opt, index) => (
                    <Combobox.Option
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
                    </Combobox.Option>
                  ))}
                </>
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </>
  );
}

Autocomplete.propTypes = {
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
Autocomplete.defaultProps = {
  options: [],
  defaultValue: null,
  fetchItems: null,
  renderOptions: null,
  label: "",
  onChange: () => {},
  name: "",
  error: false,
  helperText: "",
  register: () => ({}),
  getOptionSelected: null,
};

export default Autocomplete;
