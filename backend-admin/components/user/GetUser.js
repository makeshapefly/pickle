'use client'

import { useEffect } from 'react';
import { findUserByEmail, insertUser } from '@/app/db/UserRepository'
import { findRoleById } from "@/app/db/RoleRepository"
import { db } from "@/lib/database/db";
import { auth } from '@/app/firebase/firebase'
import { authStateReady } from "firebase/auth";
import { userToWebUser } from "@/app/db/User"
import { useAuth } from '@/app/auth/AuthUserContext'
import { onAuthStateChanged } from 'firebase/auth';

export default async function GetUser() {
    const { user, loading } = useAuth();
    console.log("authUser: " + user)

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("user3: " + JSON.stringify(user))
            if (user) {
                return user
            } else {
            }
        });
        return () => unsubscribe();
    }, []);

    /*await auth.authStateReady()
    const currentUser = auth.currentUser
    console.log("currentUser: " + currentUser) */

    /*get Clerk user details
    let email = clerkUser.emailAddresses[0].emailAddress
    let firstName = clerkUser.firstName
    let lastName = clerkUser.lastName

    /* get saved user in db */
    //const user = await findUserByEmail(db, email)

    //let webUser = null

    //if user does not exist, create new user with org NONE
    /* if (!user) {
         const insertedUser = await insertUser(db, {
             first_name: firstName,
             last_name: lastName,
             email: email,
             created_at: '2024-12-06',
             organisation: 1
         })
         webUser = userToWebUser(insertedUser)
     } else {
         webUser = userToWebUser(user)
     }
 
     //get user's role
     const role = await findRoleById(db, webUser.id)
     if (role) {
         webUser.role = role.role
     }*/

}