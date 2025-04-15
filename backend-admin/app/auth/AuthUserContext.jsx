'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth } from '@/app/firebase/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { getUser } from '@/app/actions/user/getUser'
import { userToWebUser } from "@/app/db/User"

const AuthContext = createContext({ user: null, webUser: null });

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); //firebase auth user
  const [webUser, setWebUser] = useState(null); //firestore user

  const retrieveUser = async (uid) => {
    let user = await getUser(uid)
    addWebUser(userToWebUser(user))
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        retrieveUser(user.uid)       
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const addWebUser = (user) => {
    setWebUser(user);
  };

  return <AuthContext.Provider value={{ user, webUser, addWebUser }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);