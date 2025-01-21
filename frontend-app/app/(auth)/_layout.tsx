import { Redirect, router, Stack } from 'expo-router'
import { useSignUp, useSignIn, useAuth } from '@clerk/clerk-expo'

export default function AuthRoutesLayout() {
  const { isSignedIn } = useAuth()
  const { isLoaded, signUp, setActive } = useSignUp()

  return <Stack />
}