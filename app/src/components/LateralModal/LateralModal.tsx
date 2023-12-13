import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';

function LateralModal() {
  return <Dialog.Root>
    <Dialog.Trigger asChild>
      <button className="Button violet">hey</button>
    </Dialog.Trigger>
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>

        <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            x
          </button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export default LateralModal;
