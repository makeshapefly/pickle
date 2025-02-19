import Layout from "@/components/layout/Layout"
import MyClub from "@/components/sections/MyClub"
import GetUser from "@/components/user/GetUser"

export default async function Home() {

    const webUser = await GetUser()

    return (
        <>

            <Layout user={webUser}>
                <div className="tf-section-3 mb-30">
                    <MyClub user={webUser} />
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