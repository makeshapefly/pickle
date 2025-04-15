'use client'

import Layout from "@/components/layout/Layout"
import MyClub from "@/components/sections/MyClub"
import GetUser from "@/components/user/GetUser"
import MembersPanel from "@/components/members/MembersPanel"
import MembersCode from "@/components/members/MemberCode"
import { useAuth } from '@/app/auth/AuthUserContext'

export default async function Home() {

    const { user, webUser, loading } = useAuth();

    return (
        <>

            <Layout user={webUser}>
                <div className="tf-section-3 mb-30">
                    <MyClub user={webUser} />
                    {webUser && webUser.first_name}
                </div>
                <div className="tf-section-8 mb-30">

                </div>
                <div className="tf-section-8 mb-30">
                    <div className="tf-section-2">
                    </div>
                </div>
                <div className="tf-section-2">
                </div>
            </Layout>
        </>
    )
}