import React, { useContext } from "react"
import { Redirect } from 'expo-router'
import { UserStateContext } from "./(auth)/UserStateContext"

const Index = () => {
  const { user, http } = useContext(UserStateContext)
  const [httpStatus, setHttpStatus] = http

  //alert(JSON.stringify(httpStatus))
  if (httpStatus == 404) {
    //user does not exist
    return <Redirect href={"/setupuserdetails"} />
  }

  if (httpStatus == 200) {
    return <Redirect href={"/(tabs)"} />
  }

  if (httpStatus == -1) {
    return <Redirect href={"/signin"} />
  }

}

export default Index;