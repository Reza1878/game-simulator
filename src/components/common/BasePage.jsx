import React from 'react';
import Box from './Box';
import Text from './Text';

function BasePage({ title = '', children }) {
  return (
    <Box>
      {title && (
        <Text variant="h2" className="mb-3 font-medium">
          {title}
        </Text>
      )}
      {children}
    </Box>
  );
}

export default BasePage;
