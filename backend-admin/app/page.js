import Layout from "@/components/layout/Layout"
import Goal1 from "@/components/sections/Goal1"
import GetUser from "@/components/user/GetUser"

export default async function Home() {

    const webUser = await GetUser()

    return (
        <>

            <Layout user={webUser}>
                <div className="tf-section-4 mb-30">
                    <Goal1 />
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