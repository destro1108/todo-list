import React from "react";
import Modal from "react-modal";
import { toggleIsEditing } from "../store/slices/TodoSlice";
import { useAppDispatch, useAppSelector } from "../store/store";

Modal.setAppElement("#root");

const ReactModal = () => {
  const { isEditing, editItem } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const handleClose = () => {
    dispatch(toggleIsEditing());
  };
  return (
    <Modal
      isOpen={isEditing}
      onRequestClose={handleClose}
      closeTimeoutMS={300}
      portalClassName={`absolute left-0 top-0 bottom-0 right-0 transition-all ease-in-out duration-300 transform ${
        isEditing ? "opacity-100" : "opacity-0 z-0 invisible"
      }`}
      className={`bg-gray-700 text-gray-200 w-3/4 md:w-1/3 h-4/6 md:h-3/6 overflow-y-scroll hide-scroll p-4 m-auto absolute left-0 top-0 bottom-0 right-0 outline-none transition-all ease-in-out duration-300 transform ${
        isEditing ? "opacity-100" : "opacity-0 z-0"
      }`}
      overlayClassName="bg-transparent w-full h-full absolute left-0 top-0 bottom-0 right-0"

      //   style={{
      //     content: {
      //       margin: "0 auto",
      //       width: "56rem",
      //       background: "#000",
      //       opacity: "1",
      //       justifySelf: "center",
      //     },
      //   }}
    >
      {editItem}
    </Modal>
  );
};

export default ReactModal;
