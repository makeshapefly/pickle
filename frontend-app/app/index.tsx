import { Redirect } from 'expo-router'
import { useSignUp, useAuth, useSession } from '@clerk/clerk-expo'

const Index = () => {
  const { isSignedIn } = useAuth()
  const { isLoaded } = useSignUp()

  //alert(isSignedIn)

  if (isLoaded && isSignedIn) {
    return <Redirect href={'/(tabs)'} />
  }
  if (isLoaded && !isSignedIn) {
    return <Redirect href={'/signin'} />
  }
}

export default Index;