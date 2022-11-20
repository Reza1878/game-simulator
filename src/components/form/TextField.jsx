import React from 'react';
import * as t from 'prop-types';
import clsx from 'clsx';

function TextField({
  type,
  className,
  name,
  id,
  error,
  register,
  multiline,
  ...otherProps
}) {
  const registerAttr = register ? register(name) : {};

  const inputClass = clsx(
    'border px-2 py-1 w-full outline-none rounded-md disabled:bg-gray-200 disabled:opacity-7',
    {
      'border-red-500': error,
      'border-gray-300': !error,
    },
    className
  );
  if (multiline) {
    return (
      <textarea
        type={type}
        name={name}
        className={inputClass}
        id={id}
        rows={3}
        {...otherProps}
        {...registerAttr}
      />
    );
  }
  return (
    <input
      type={type}
      name={name}
      className={inputClass}
      id={id}
      {...otherProps}
      {...registerAttr}
    />
  );
}

TextField.propTypes = {
  type: t.string,
  className: t.string,
  name: t.string,
  id: t.string,
  error: t.bool,
  register: t.func,
  onChange: t.func,
  multiline: t.bool,
};

export default TextField;
