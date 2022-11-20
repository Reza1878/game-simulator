import React from 'react';
import * as t from 'prop-types';
import clsx from 'clsx';

function Label({ children, className, htmlFor, error }) {
  return (
    <label
      className={clsx(
        'block font-medium mb-1 text-sm',
        { 'text-red-500': error },
        className
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

Label.propTypes = {
  children: t.node,
  className: t.string,
  htmlFor: t.string,
  error: t.bool,
};

export default Label;
