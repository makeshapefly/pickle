'use client'

import Layout from '@/components/layout/Layout'
import AddSessionForm from '@/components/session/AddSessionForm'
import { useAuth } from '@/app/auth/AuthUserContext'

export default async function CreateSession() {
    const { webUser } = useAuth()

    return (
        <>

            <Layout breadcrumbTitleParent="Session" breadcrumbTitle="Create Session" user={webUser}>
                <AddSessionForm user={webUser} />
            </Layout>
        </>
    )
}