import React, { useState, createContext, useEffect } from "react";
import { useAuth } from '@clerk/clerk-expo'

export const UserStateContext = createContext<any>(null);

type User = {
    isSignedIn: boolean;
    id: string;
    firstName: string;
    lastName: string;
    mobilePhone: string;
    email: string;
};

export const StateProvider = (props) => {
    const { isSignedIn } = useAuth()
    const [userDetails, setUserDetails] = useState({})
    const [httpStatus, setHttpStatus] = useState(0)

    const { getToken } = useAuth()

    const memberDetails = async () => {
        const token = await getToken()
        const response = await fetch(process.env.EXPO_PUBLIC_DB_URL + 'member/', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        if (response.status == 404) {
            setHttpStatus(404)
        }

        if (response.status == 401) {
            setHttpStatus(401)
        }

        if (response.status == 200) {
            setHttpStatus(200)
            const data = await response.json()

            let user: User = {
                isSignedIn: true,
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                mobilePhone: data.mobilePhone,
                email: data.email
            }

            setUserDetails(user)
        }
    }

    const notSignedIn = () => {
        setHttpStatus(-1)
    }

    useEffect(() => {
        if (isSignedIn) {
            memberDetails()
        } else {
            notSignedIn()
        }
    }, []);

    return (
        <UserStateContext.Provider value={{user: [userDetails, setUserDetails], http: [httpStatus, setHttpStatus]}}>
            {props.children}
        </UserStateContext.Provider>
    )
}
