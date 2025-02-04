import { Kysely, expressionBuilder } from 'kysely'
import { Member, Database } from '@/lib/database/types'

/*export async function findMemberById(
    db: Kysely<Database>,
    id: string
): Promise<Member | undefined> {
    const member = await db
        .selectFrom('role')
        .selectAll()
        .where('user_id', '=', id)
        .executeTakeFirst()

    return member
}*/

export async function getAllMembersByOrg(
    db: Kysely<Database>,
    org: number,
    limit: number,
    offset: number
): Promise<Member[] | undefined> {
    const eb = expressionBuilder<Database, 'member'>()
    const member = await db
        .selectFrom('member')
        .selectAll()
        .where(({ eb }) =>
            eb('organisation', '=', org)
        )
        .limit(limit)
        .offset(offset)
        .execute()

    return member
}

/* Finds members for an org by search term */
export async function searchMembers(
    db: Kysely<Database>,
    org: number,
    term: string,
    email: string,
    limit: number,
    offset: number
): Promise<Member[] | undefined> {
    const eb = expressionBuilder<Database, 'member'>()
    const member = await db
        .selectFrom('member')
        .selectAll()
        .where(({ eb, or, and }) => or([
            and([
                eb('organisation', '=', org),
                eb('email', 'like', '%' + term + '%'),
                eb('email', '!=', email)
            ]),
            eb('organisation', '=', org).and(
                eb(db.fn('upper', ['first_name']), 'like', '%' + term.toUpperCase() + '%').or(eb(db.fn('upper', ['last_name']), 'like', '%' + term.toUpperCase() + '%'))
                
            )
            .and(
                eb('email', '!=', email)
            )
        ]))
        .limit(limit)
        .offset(offset)
        .execute()

    return member
}