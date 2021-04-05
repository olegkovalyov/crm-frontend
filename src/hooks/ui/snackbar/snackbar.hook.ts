import { useState } from 'react';

export const useSnackbar = () => {
  const [isOpenedSnackbar, setIsOpenedSnackbar] = useState(false);
  const handleOpenSnackBar = () => {
    setIsOpenedSnackbar(true);
  };

  const handleCloseSnackBar = () => {
    setIsOpenedSnackbar(false);
  };

  return {
    isOpenedSnackbar,
    handleOpenSnackBar,
    handleCloseSnackBar,
  };
};