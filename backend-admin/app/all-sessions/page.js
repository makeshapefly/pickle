
import Layout from "@/components/layout/Layout"
import { db } from "@/lib/database/db";
import GetUser from "@/components/user/GetUser"
import { getAllSessionsByOrg } from "@/app/db/SessionRepository"
import AllSessionsList from "@/components/session/AllSessionsList"
import Pagination from '@/components/user/Pagination';

export default async function AllSessions(props) {

    const webUser = await GetUser()

    const searchParams = await props.searchParams;
    const page = searchParams?.page || '';

    let itemsPerPage = 2; //number of users displayed per page

    let sessions = []

    sessions = await getAllSessionsByOrg(db, webUser.organisation, itemsPerPage, Number(page))
    console.log(JSON.stringify(sessions))
    let totalSessions = await getAllSessionsByOrg(db, webUser.organisation, 2000000000, 0)

    return (
        <>

            <Layout breadcrumbTitleParent="Sessions" breadcrumbTitle="Club Sessions">

                <AllSessionsList sessions={sessions} />
                <div className="divider" />

               {/* <Pagination users={totalSessions.length} itemsPerPage={itemsPerPage} /> */}

            </Layout >
        </>
    )
}