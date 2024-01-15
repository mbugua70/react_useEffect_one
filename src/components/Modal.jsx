import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      // return {
      //   open: () => {
      //     dialog.current.showModal();
      //   },
      //   close: () => {
      //     dialog.current.close();
      //   },
      // };

      const open = () => {
        setIsOpen(true);
        dialog.current.showModal();
      };

      const close = () => {
        setIsOpen(false);
        dialog.current.close();
      };
      return { open, close };
    },
    []
  );

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {isOpen && children}
    </dialog>,
    document.getElementById("modal")
  );
});

export default Modal;
