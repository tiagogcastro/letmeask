import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createContext } from 'react';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth';

import { auth } from '../services/firebase';

type User = {
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = {
  user: User | undefined;
  signInWithGoogle: () => Promise<void>,
}

type AuthContextProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      if(firebaseUser) {
        const { displayName, photoURL, uid } = firebaseUser;

        if(!displayName || !photoURL) {
          throw new Error('Missing information from Google Account');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
      }
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
        throw new Error('Missing information from Google Account');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}
