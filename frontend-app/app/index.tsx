import React, { useContext } from "react"
import { Redirect } from 'expo-router'
import { UserStateContext } from "./(auth)/UserStateContext"

const Index = () => {
  const { user, http } = useContext(UserStateContext)
  const [httpStatus, setHttpStatus] = http
  const [userDetails, setUserDetails] = user

  //alert(JSON.stringify(httpStatus))
  if (httpStatus == 404) {
    //user does not exist
    return <Redirect href={"/setupuserdetails"} />
  }


  if (httpStatus == 200) {
    if (userDetails.firstName == null || userDetails.firstName == '') {
      return <Redirect href={"/setupuserdetails"} />
    }
    return <Redirect href={"/(tabs)"} />
  }

  if (httpStatus == -1) {
    return <Redirect href={"/signin"} />
  }

}

export default Index;