import React from 'react';
import * as t from 'prop-types';
import clsx from 'clsx';

function Box({ children, className }) {
  return (
    <div className={clsx('bg-white rounded-md p-4 shadow-sm', className)}>
      {children}
    </div>
  );
}

Box.propTypes = {
  children: t.node,
  className: t.string,
};

export default Box;
