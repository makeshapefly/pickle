'use client'

import { auth } from '@/app/firebase/firebase'
import { useRouter } from 'next/navigation'
import { signOut } from "firebase/auth";

export const SignOutButton = () => {
  const router = useRouter()

  const signOutSubmit = () => {
    auth.signOut()
    .then(router.push('/login'))
  }
  return (
    // Clicking on this button will sign out a user
    // and reroute them to the "/" (home) page.
    <a href="#" onClick={() => signOutSubmit()}>
      Sign out
    </a>
  );
};