import { db } from "@/lib/database/db";
import { Kysely } from 'kysely'
import { OrganisationWithMembers, Database } from '@/lib/database/types'

export async function getOrganisation(
    //db: Kysely<Database>,
    org: number,
) {
    try {
        return await db.selectFrom("organisation").where('id', '=', org).selectAll().executeTakeFirst();;
    } catch (error) {
        return "Error getting org";
    }
}

/*  functionality to deal with many to many mapping between org and members  */
export async function getWithMembers(
    db: Kysely<Database>,
    org: number,
    limit: number,
    offset: number
) {
    const organisationResponse = await db
        .selectFrom('organisation')
        .where('id', '=', org)
        .selectAll()
        .executeTakeFirst();

    if (!organisationResponse) {
        return;
    }

    const membersResponse = await db
        .selectFrom('organisation_member')
        .innerJoin('member', 'member.id', 'organisation_member.member_id')
        .where('organisation_id', '=', org)
        .select([
            'member.id as id',
            'member.mobile_phone as mobile_phone',
            'member.email as email',
            'member.first_name as first_name',
            'member.last_name as last_name',
            'member.organisation as organisation',
            'member.created_at as created_at',
        ])
        .limit(limit)
        .offset(offset)
        .execute();

    return new OrganisationWithMembers({
        ...organisationResponse,
        members: membersResponse,
    });
}

export async function searchWithMembers(
    db: Kysely<Database>,
    org: number,
    term: string,
    limit: number,
    offset: number
) {
    const organisationResponse = await db
        .selectFrom('organisation')
        .where('id', '=', org)
        .selectAll()
        .executeTakeFirst();

    if (!organisationResponse) {
        return;
    }

    const membersResponse = await db
        .selectFrom('organisation_member')
        .innerJoin('member', 'member.id', 'organisation_member.member_id')
        .where('organisation_id', '=', org)
        .select([
            'member.id as id',
            'member.mobile_phone as mobile_phone',
            'member.email as email',
            'member.first_name as first_name',
            'member.last_name as last_name',
            'member.organisation as organisation',
            'member.created_at as created_at',
        ])
        .where(({ eb, or, and }) => or([
                eb(db.fn('upper', ['member.first_name']), 'like', '%' + term.toUpperCase() + '%').or(eb(db.fn('upper', ['member.last_name']), 'like', '%' + term.toUpperCase() + '%'))
                
        ]))
        .limit(limit)
        .offset(offset)
        .execute();

    return new OrganisationWithMembers({
        ...organisationResponse,
        members: membersResponse,
    });
}

