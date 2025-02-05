import { expressionBuilder, Kysely } from 'kysely'
import { NewSessionType, Session, Database } from '@/lib/database/types'

export async function insertSession(
    db: Kysely<Database>,
    session: NewSessionType
): Promise<Session> {
    const insertedSession = await db
        .insertInto('session')
        .values(session)
        .returningAll()
        .executeTakeFirstOrThrow()

    return insertedSession
}

export async function getAllSessionsByOrg(
    db: Kysely<Database>,
    org: number,
    limit: number,
    offset: number
): Promise<Session[] | undefined> {
    const eb = expressionBuilder<Database, 'session'>()
    const user = await db
        .selectFrom('session')
        .selectAll()
        .where(({ eb }) =>
            eb('organisation_id', '=', org)
        )
        .limit(limit)
        .offset(offset)
        .execute()

    return user
}