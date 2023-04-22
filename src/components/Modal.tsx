import ReactDOM from "react-dom";
import { FC, useEffect, useRef, useState } from "react";

type BackdropCloseType = "active" | "inactive";

interface ModalProps {
  onClose?: () => void;
  container?: HTMLElement | null;
  className?: string;
  show?: boolean;
  backdropClose?: BackdropCloseType;
  children: any;
  needToBeFixed?: boolean;
}

const Modal: FC<ModalProps> = ({
  children,
  onClose = () => {},
  className,
  container = document.body,
  show = false,
  backdropClose = "active",
  needToBeFixed,
}) => {
  const [open, setOpen] = useState<boolean>(show);
  const ref = useRef(null);

  useEffect(() => setOpen(show), [show]);

  return open ? (
    container &&
      ReactDOM.createPortal(
        <div
          className="modal-wrapper"
          style={{
            position: needToBeFixed ? "fixed" : "absolute",
          }}
        >
          <span className="masked-fix"></span>
          <div
            ref={ref}
            className={`${className || ""} container__modal`}
            onClick={(e) => {
              if (e.target === ref.current) {
                backdropClose === "active" ? onClose() : <></>;
              }
            }}
          >
            {children}
          </div>
        </div>,
        container
      )
  ) : (
    <></>
  );
};
export default Modal;
