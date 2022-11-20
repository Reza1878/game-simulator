import React from 'react';
import * as t from 'prop-types';
import Modal from './Modal';
import Text from './Text';
import Button from './Button';

function ConfirmationModal({
  open,
  onClose,
  title,
  description,
  confirmText,
  confirmButtonColor,
  cancelText,
  cancelButtonColor,
}) {
  return (
    <Modal open={open} onClose={() => onClose({ isConfirmed: false })}>
      <Text variant="h3" className="font-medium">
        {title}
      </Text>
      <Text className="my-2">{description}</Text>
      <div className="flex gap-2">
        <Button
          onClick={() => onClose({ isConfirmed: true })}
          color={confirmButtonColor}
        >
          {confirmText}
        </Button>
        <Button
          onClick={() => onClose({ isConfirmed: false })}
          color={cancelButtonColor}
          variant="link"
        >
          {cancelText}
        </Button>
      </div>
    </Modal>
  );
}

ConfirmationModal.propTypes = {
  open: t.bool,
  onClose: t.func,
  title: t.string,
  description: t.string,
  confirmText: t.string,
  confirmButtonColor: t.string,
  cancelText: t.string,
  cancelButtonColor: t.string,
};
ConfirmationModal.defaultProps = {
  open: false,
  onClose: () => {},
  title: 'Delete this item?',
  description: "You won't be able to revert this!",
  confirmText: 'Yes, delete it!',
  confirmButtonColor: 'danger',
  cancelText: 'Cancel',
  cancelButtonColor: 'primary',
};

export default ConfirmationModal;
