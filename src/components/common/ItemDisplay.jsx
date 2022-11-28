import React from 'react';
import * as t from 'prop-types';
import Text from './Text';

/**
 *
 * @prop {data} object
 * @prop {attrAndLabels} array of {label: string, key: string, display?: (val) => any}
 * @returns
 */
function ItemDisplay({ data, attrAndLabels }) {
  return (
    <>
      {attrAndLabels.map((attr, index) => (
        <div key={index} className="grid grid-cols-3 mb-2">
          <div className="col-span-3 md:col-span-1">
            <Text className="font-bold">{attr.label}</Text>
          </div>
          <div className="col-span-3 md:col-span-2">
            {attr.display ? (
              attr.display(data[attr.key])
            ) : (
              <Text>{data[attr.key] ? data[attr.key] : 'Not set'}</Text>
            )}
          </div>
        </div>
      ))}
    </>
  );
}

ItemDisplay.propTypes = {
  data: t.object,
  attrAndLabels: t.array,
};

export default ItemDisplay;
