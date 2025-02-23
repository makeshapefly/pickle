import { getOrganisation } from '@/app/db/OrganisationRepository'
import { db } from "@/lib/database/db";


export default async function MembersCode({user}) {
    const response: any = await getOrganisation(db, user.organisation)
    console.log(JSON.stringify(response))
    const joinCode = response.join_code

    return (
        <>
            <div className="wg-box h-full">
                <h3>Member Join Code</h3>
                <p>Send this code to your club members for them to signup in the App.</p>
                <div className="block-warning">
                    <div className="body-title-2">{joinCode}</div>
                </div>
            </div>
        </>
    )
}