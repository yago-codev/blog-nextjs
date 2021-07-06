import Modal, { Props } from 'react-modal';

interface IModalCustomProps extends Props {
  title: string;
}

export function ModalCustom({
  isOpen,
  onRequestClose,
  title
}: IModalCustomProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h1>{title}</h1>
    </Modal>
  );
}
