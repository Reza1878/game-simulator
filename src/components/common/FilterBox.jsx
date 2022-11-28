import React from 'react';
import * as t from 'prop-types';
import Text from './Text';
import clsx from 'clsx';

function FilterBox({ children, className }) {
  return (
    <div
      className={clsx(
        'border p-2 flex gap-1 lg:gap-4 flex-wrap lg:flex-nowrap relative',
        className
      )}
    >
      <Text className="absolute -top-[14px] font-medium bg-white px-2 text-gray-600">
        Filter Box
      </Text>
      {children}
    </div>
  );
}

FilterBox.propTypes = {
  children: t.node,
  className: t.string,
};

export default FilterBox;
