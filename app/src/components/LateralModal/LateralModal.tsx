import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import './styles.css';
import classes from './Styles.module.css'

function LateralModal({ open, setOpen, children }) {
  return <Dialog.Root open={open} onOpenChange={setOpen}>

    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
       
        {children}
        {/* <Dialog.Close asChild>
          <button className="IconButton" aria-label="Close">
            x
          </button>
        </Dialog.Close> */}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>;
}

export default LateralModal;
