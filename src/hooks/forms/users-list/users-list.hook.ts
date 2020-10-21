import React, { useState } from 'react';

export const useUsersList = () => {
  const [selectedUsers, setSelectedUsers] = useState<Array<string>>([]);

  const handleChangeUsersList = (e: React.ChangeEvent<HTMLInputElement>, userId: string) => {
    let newState: string[] = [];
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
