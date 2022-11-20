import React from 'react';
import * as t from 'prop-types';
import clsx from 'clsx';

function Backdrop({ show, onClick, className }) {
  return (
    <div
      className={clsx(
        'fixed inset-0 bg-black opacity-70 transition-opacity',
        [show && 'visible'],
        [!show && 'invisible opacity-0'],
        className
      )}
      onClick={onClick}
    />
  );
}

Backdrop.propTypes = {
  show: t.bool,
  onClick: t.func,
  className: t.string,
};

Backdrop.defaultProps = {
  show: false,
  onClick: () => {},
  className: '',
};

export default Backdrop;
