import Layout from '@/components/layout/Layout'
import GetUser from "@/components/user/GetUser"
import AddUserForm from '@/components/user/AddUserForm'

export default async function AddNewYser() {
    const webUser = await GetUser()

    return (
        <>

            <Layout breadcrumbTitleParent="User" breadcrumbTitle="Add New User" user={webUser}>
                <AddUserForm />
            </Layout>
        </>
    )
}