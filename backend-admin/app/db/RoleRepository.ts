import { Kysely } from 'kysely'
import { Role, NewRole, RoleUpdate, Database } from '@/lib/database/types'

export async function findRoleById(
    db: Kysely<Database>,
    id: string
): Promise<Role | undefined> {
    const role = await db
        .selectFrom('role')
        .selectAll()
        .where('user_id', '=', id)
        .executeTakeFirst()

    return role
}

export async function insertRole(
    db: Kysely<Database>,
    role: NewRole
): Promise<Role> {
    const insertedRole = await db
        .insertInto('role')
        .values(role)
        .returningAll()
        .executeTakeFirstOrThrow()

    return insertedRole
}