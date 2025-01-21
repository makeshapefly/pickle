'use server'
import { deleteUserById } from "../db/UserRepository"
import { db } from "@/lib/database/db";
import { revalidatePath } from 'next/cache'

export async function deleteUser(user) {
    const result = await deleteUserById(db, user)
    revalidatePath('/all-user')
    return result
}