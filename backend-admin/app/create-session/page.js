import Layout from '@/components/layout/Layout'
import GetUser from "@/components/user/GetUser"
import AddSessionForm from '@/components/session/AddSessionForm'

export default async function CreateSession() {
    const webUser = await GetUser()

    return (
        <>

            <Layout breadcrumbTitleParent="Session" breadcrumbTitle="Create Session" user={webUser}>
                <AddSessionForm user={webUser} />
            </Layout>
        </>
    )
}