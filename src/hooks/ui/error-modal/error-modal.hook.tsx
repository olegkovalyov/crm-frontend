import React, { useState } from 'react';

export const useErrorModal = () => {
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const handleCloseErrorModal = () => {
    setIsOpenErrorModal(false);
  };
  const handleOpenErrorModal = () => {
    setIsOpenErrorModal(true);
  };

  return {
    isOpenErrorModal,
    handleOpenErrorModal,
    handleCloseErrorModal,
  };
};
