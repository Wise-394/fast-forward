import { create } from "zustand";

type ModalType = "danger" | "info";

interface Props {
  type: ModalType;
  message: string;
  onConfirm: () => void;
}

interface ConfirmationModalState {
  isModalOpen: boolean;
  openModal: (props: Props) => void;
  closeModal: () => void;
  type: ModalType;
  message: string;
  onConfirm: () => void;
}

export const useConfirmationModal = create<ConfirmationModalState>((set) => ({
  isModalOpen: false,
  type: "info",
  message: "",
  onConfirm: () => {},
  openModal: (props) =>
    set({
      isModalOpen: true,
      type: props.type,
      message: props.message,
      onConfirm: props.onConfirm,
    }),
  closeModal: () =>
    set({ isModalOpen: false, message: "", onConfirm: () => {} }),
}));
