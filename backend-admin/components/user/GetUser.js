import { findUserByEmail, insertUser } from '@/app/db/UserRepository'
import { findRoleById } from "@/app/db/RoleRepository"
import { db } from "@/lib/database/db";
import { currentUser } from '@clerk/nextjs/server'
import { userToWebUser } from "@/app/db/User"

export default async function GetUser() {
    const clerkUser = await currentUser()

    //get Clerk user details
    let email = clerkUser.emailAddresses[0].emailAddress
    let firstName = clerkUser.firstName
    let lastName = clerkUser.lastName

    /* get saved user in db */
    const user = await findUserByEmail(db, email)

    let webUser = null

    //if user does not exist, create new user with org NONE
    if (!user) {
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
    }

    return webUser
}