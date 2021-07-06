/* eslint-disable */
import { useState } from 'react';
import dynamic from 'next/dynamic';

const ModalCustom = dynamic(() => import('../components/ModalCustom').then((mod) => mod.ModalCustom).finally(),
  { loading: () => <p>Loading...</p>, ssr: false },
);

export default function Calculation() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSum = async () => {
    const { sum } = (await import('../libs/calc')).default;
    alert(sum(3, 5));
  };

  return (
    <div>
      <h1>Cálculo</h1>
      <button
        onClick={() => {
          handleSum();
          handleOpenModal();
        }}
      >
        Somar
      </button>
      {isModalOpen && (
        <ModalCustom
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          title="Modal"
        />
      )}
    </div>
  );
}
