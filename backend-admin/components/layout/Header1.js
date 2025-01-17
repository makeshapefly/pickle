'use client'
import { Menu } from '@headlessui/react'
import dynamic from 'next/dynamic'
import Link from "next/link"
import FullScreenButton from '../elements/FullScreenButton'
import { SignOutButton } from "../signout/SignOutButton";
const ThemeSwitch = dynamic(() => import('../elements/ThemeSwitch'), {
    ssr: false,
})

export default function Header1({ scroll, isMobileMenu, handleSidebar, handleOffcanvas, user }) {
    return (
        <>

            <div className="header-dashboard">
                <div className="wrap">
                    <div className="header-left">
                        <Link href="/">
                            <img id="logo_header_mobile" alt="" src="/images/logo/logo.png" data-light="images/logo/logo.png" data-dark="images/logo/logo-dark.png" data-width="154px" data-height="52px" data-retina="images/logo/logo@2x.png" />
                        </Link>
                        <div className="button-show-hide" onClick={handleSidebar}>
                            <i className="icon-menu-left" />
                        </div>                       
                    </div>
                    <div className="header-grid">
                        <ThemeSwitch />                    
                        <div className="popup-wrap message type-header">
                            <Menu as="div" className="dropdown">
                                <Menu.Button className="btn btn-secondary dropdown-toggle" type="button">
                                    <span className="header-item">
                                        <span className="text-tiny">1</span>
                                        <i className="icon-message-square" />
                                    </span>
                                </Menu.Button>
                                <Menu.Items as="ul" className="dropdown-menu dropdown-menu-end has-content show d-flex end-0" aria-labelledby="dropdownMenuButton2">
                                    <li>
                                        <h6>Notifications</h6>
                                    </li>
                                    <li>
                                        <div className="message-item item-1">
                                            <div className="image">
                                                <i className="icon-noti-1" />
                                            </div>
                                            <div>
                                                <div className="body-title-2">Discount available</div>
                                                <div className="text-tiny">Morbi sapien massa, ultricies at rhoncus
                                                    at, ullamcorper nec diam</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item item-2">
                                            <div className="image">
                                                <i className="icon-noti-2" />
                                            </div>
                                            <div>
                                                <div className="body-title-2">Account has been verified</div>
                                                <div className="text-tiny">Mauris libero ex, iaculis vitae rhoncus
                                                    et</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item item-3">
                                            <div className="image">
                                                <i className="icon-noti-3" />
                                            </div>
                                            <div>
                                                <div className="body-title-2">Order shipped successfully</div>
                                                <div className="text-tiny">Integer aliquam eros nec sollicitudin
                                                    sollicitudin</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="message-item item-4">
                                            <div className="image">
                                                <i className="icon-noti-4" />
                                            </div>
                                            <div>
                                                <div className="body-title-2">Order pending: <span>ID 305830</span>
                                                </div>
                                                <div className="text-tiny">Ultricies at rhoncus at ullamcorper</div>
                                            </div>
                                        </div>
                                    </li>
                                    <li><Link href="#" className="tf-button w-full">View all</Link></li>
                                </Menu.Items>
                            </Menu>
                        </div>
                        <FullScreenButton />                     
                        <div className="popup-wrap user type-header">
                            <Menu as="div" className="dropdown">
                                <Menu.Button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton3" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span className="header-user wg-user">
                                        <span className="image">
                                            <img src="/images/avatar/user-1.png" alt="" />
                                        </span>
                                        <span className="flex flex-column">
                                            <span className="body-title mb-2">{user && user.firstName}</span>
                                            <span className="text-tiny">Admin</span>
                                        </span>
                                    </span>
                                </Menu.Button>
                                <Menu.Items
                                    as="ul"
                                    className="dropdown-menu dropdown-menu-end has-content show d-flex end-0"
                                    aria-labelledby="dropdownMenuButton3"
                                >
                                    <li>
                                        <Link href="/profile" className="user-item">
                                            <div className="icon">
                                                <i className="icon-user" />
                                            </div>
                                            <div className="body-title-2">Profile</div>
                                        </Link>
                                    </li>
                                    <li>
                                        <div href="/login" className="user-item">
                                            <div className="icon">
                                                <i className="icon-log-out" />
                                            </div>
                                            <div className="body-title-2">
                                                <SignOutButton />
                                            </div>
                                        </div>
                                    </li>
                                </Menu.Items>
                            </Menu>
                        </div>
                        <div className="divider" />

                        <div className="setting cursor-pointer" onClick={handleOffcanvas}><i className="icon-settings" /></div>

                    </div>
                </div>
            </div>

        </>
    )
}
