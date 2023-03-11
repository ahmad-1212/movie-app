import React from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

const portalElement = document.getElementById("overlays");

const Modal = ({
  width,
  height,
  children,
  handleClose,
  open,
  backgroundColor,
}) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop open={open} onClick={handleClose} sx={{ zIndex: 555 }}>
          <AnimatePresence>
            {open && (
              <motion.div
                className="modal"
                initial={{ opacity: 0, y: -100 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                  },
                }}
                exit={{ opacity: 0, y: -100 }}
                style={{
                  width: width,
                  height: height,
                  backgroundColor: backgroundColor,
                }}
              >
                {children}
              </motion.div>
            )}
          </AnimatePresence>
        </Backdrop>,
        portalElement
      )}
    </>
  );
};

export default Modal;
