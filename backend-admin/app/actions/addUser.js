'use server'
import { findUserByEmail, insertUser } from "@/app/db/UserRepository"
import { insertRole } from "@/app/db/RoleRepository"
import { currentUser } from '@clerk/nextjs/server'
import { db } from "@/lib/database/db";
import { revalidatePath } from 'next/cache'

export async function addUser(user, role) {
    //get organisation from logged in user
    const clerkUser = await currentUser()
    let email = clerkUser.emailAddresses[0].emailAddress
    const loggedInUser = await findUserByEmail(db, email)
    
    console.log('organisation: ' + JSON.stringify(user))

    const insertedUser = await insertUser(db, {
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        created_at: '2024-12-06',
        organisation: loggedInUser.organisation
    })

    const insertedRole = await insertRole(db, {
        role: role.role,
        user_id: insertedUser.id
    })
    //console.log("insertedUser: " + JSON.stringify(insertedUser))
    revalidatePath("/add-new-user")
    revalidatePath("/all-user")
    return insertedUser
}