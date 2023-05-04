import { useGameActions } from '@/stores/gameState';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

const useLocalOrSessionUsername = () => {
  const session = useSession();
  const { updateUser } = useGameActions();

  // When session is loaded, set username
  useEffect(() => {
    if (session.data && session.data.user.name) {
      updateUser({ name: session.data.user.name, auth: true });
    } else {
      let localUser = localStorage.getItem('session');
      if (!localUser) {
        const userstring = `Guest ${String(Math.floor(Math.random() * 1000))}`;
        localStorage.setItem('session', userstring);
        updateUser({ name: userstring, auth: false });
      } else {
        updateUser({ name: localUser, auth: false });
      }
    }
  }, [session, updateUser]);

  return session;
};

export default useLocalOrSessionUsername;
