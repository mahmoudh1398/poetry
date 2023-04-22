import React, { useEffect } from "react";

interface useCloseByClickOutSideProps {
  ref: React.RefObject<HTMLDivElement>;
  isOpened: boolean;
  setIsOpened: (state: boolean) => void;
}
export const useCloseByClickOutSide = (props: useCloseByClickOutSideProps) => {
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (props.ref.current && !props.ref.current.contains(event.target)) {
        props.setIsOpened(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);
};
