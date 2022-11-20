import React from 'react';
import * as t from 'prop-types';
import clsx from 'clsx';

function PaginationButton({ children, disabled, onClick }) {
  return (
    <button
      className={clsx('border rounded p-1 hover:bg-gray-100', {
        'bg-gray-200 opacity-70 pointer-events-none': disabled,
      })}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

PaginationButton.propTypes = {
  children: t.node,
  disabled: t.bool,
  onClick: t.func,
};
PaginationButton.defaultProps = {
  disabled: false,
  onClick: () => {},
};

export default PaginationButton;
