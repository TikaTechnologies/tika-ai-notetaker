import React from "react";
import { ConfirmModal, ConfirmModalProps } from "./Confirmation";
import { DeleteModal, DeleteModalProps } from "./Delete";

export interface BaseModalProps<T = any, K = any> {
  payload: T;
  onModalConfirm: (state?: K) => void;
  close: () => void;
}

export type ModalProps = {
  ConfirmModal: Partial<BaseModalProps<ConfirmModalProps>>;
  DeleteModal: Partial<BaseModalProps<DeleteModalProps>>;
};

export interface ModalState<T extends keyof typeof ModalsMap> {
  open: boolean;
  name?: T;
  props?: ModalProps[T];
}

export const ModalsMap = {
  ConfirmModal,
  DeleteModal,
};

class ModalEngine extends React.Component<
  ModalState<keyof ModalProps> & BaseModalProps
> {
  ref: React.RefObject<HTMLDialogElement> = React.createRef();

  public render() {
    if (!this.props.open || !this.props.name) return null;

    const ModalComponent = 
      ModalsMap[this.props.name] as React.ComponentType<
        ModalProps[keyof ModalProps]
      >;

    return (
      <div className="dialog-backdrop">
        <dialog open ref={this.ref}>
          <ModalComponent {...this.props} />
        </dialog>
      </div>
    );
  }
}

export default ModalEngine;
