import { FC, ReactNode } from 'react';

import ClickAway from '@/components/layout/outside-click';

type ModalProps = {
  openModal: boolean;
  onClose: () => void;
  children: ReactNode;
};
const Modal: FC<ModalProps> = ({ children, onClose, openModal }) => {
  return (
    <>{openModal && <ClickAway onClickAway={onClose}>{children}</ClickAway>}</>
  );
};

export default Modal;
