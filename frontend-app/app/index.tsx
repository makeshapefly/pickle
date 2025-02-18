import React, { useContext } from "react"
import { Redirect } from 'expo-router'
import { useAuth } from '@clerk/clerk-expo'
//import { UserStateContext } from "./(auth)/UserStateContext"

const Index = () => {
  //const { user, http } = useContext(UserStateContext)
  //const [httpStatus, setHttpStatus] = http
  //const [userDetails, setUserDetails] = user

  //alert(JSON.stringify(httpStatus))
  const { isSignedIn } = useAuth()

  if (isSignedIn) {
    //user does not exist
    return <Redirect href={"/(tabs)"} />
  } else {
    return <Redirect href={"/signin"} />
  }

}

export default Index;