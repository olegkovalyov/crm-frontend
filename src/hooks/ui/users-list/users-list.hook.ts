import React, { useState } from 'react';

export const useUsersList = () => {
  const [selectedUsers, setSelectedUsers] = useState<Array<number>>([]);

  const handleChangeUsersList = (e: React.ChangeEvent<HTMLInputElement>, userId: number) => {
    let newState: number[] = [];
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(prevState => {
        newState = prevState.filter(id => id !== userId);
        return newState;
      });
    } else {
      setSelectedUsers(prevState => {
        const state = prevState.map(x => x);
        state.push(userId);
        return state;
      });
    }
  };

  return {
    selectedUsers,
    setSelectedUsers,
    handleChangeUsersList,
  };
};
