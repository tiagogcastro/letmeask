import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createContext } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';

import { auth } from '@/services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  isAuthChecked: boolean;
  signInWithGoogle: () => Promise<void>,
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if(firebaseUser) {
        const { displayName, photoURL, uid } = firebaseUser;

        if(!displayName || !photoURL) {
          void signOut(auth);
          setUser(undefined);
        } else {
          setUser({
            id: uid,
            name: displayName,
            avatar: photoURL
          });
        }
      }

      setIsAuthChecked(true);
    });

    return () => {
      unsubscribe();
    };

  }, []);

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();

    const result = await signInWithPopup(auth, provider);

    if(result.user) {
      const { displayName, photoURL, uid } = result.user;

      if(!displayName || !photoURL) {
        await signOut(auth);
        return;
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, isAuthChecked, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
