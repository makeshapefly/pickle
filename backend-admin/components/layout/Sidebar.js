import Link from "next/link"
import Menu from "./Menu"

export default function Sidebar({handleSidebar}) {
    return (
        <>

            <div className="section-menu-left">
                <div className="box-logo">
                    <Link href="/" id="site-logo-inner">
                        <img id="logo_header" alt="" src="/images/logo/pickleball.png" width="52px" data-light="images/logo/pickleball.png" data-dark="images/logo/pickleball.png" />
                    </Link>
                    <div className="button-show-hide" onClick={handleSidebar}>
                        <i className="icon-menu-left" />
                    </div>
                </div>
                <Menu />
                <div className="bot text-center">
                    <div className="wrap">
                        <div className="mb-20">
                            <h6>Hi, how can we help?</h6>
                            <div className="text">Contact us if you have any assistance, we will contact you as soon as
                                possible</div>
                        </div>
                        <Link href="#" className="tf-button w-full">Contact</Link>
                    </div>
                </div>
            </div>

        </>
    )
}
