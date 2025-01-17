import { db } from "@/lib/database/db";
import { Organisation, NewOrganisation, OrganisationUpdate } from '@/lib/database/types'

export async function getOrganisation() {
    try {
        return await db.selectFrom("organisation").selectAll().execute();
    } catch (error) {
        return "Error getting org";
    }
}
