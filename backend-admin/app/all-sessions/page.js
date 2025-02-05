
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { db } from "@/lib/database/db";
import GetUser from "@/components/user/GetUser"
import { getAllSessionsByOrg } from "@/app/db/SessionRepository"
import Pagination from '@/components/user/Pagination';

export default async function AllSessions(props) {

    const webUser = await GetUser()

    const searchParams = await props.searchParams;
    //const query = searchParams?.query || '';
    const page = searchParams?.page || '';

    let itemsPerPage = 2; //number of users displayed per page

    let sessions = []

    sessions = await getAllSessionsByOrg(db, webUser.organisation, itemsPerPage, Number(page))
    //sessions = response

    let totalSessions = await getAllSessionsByOrg(db, webUser.organisation, 2000000000, 0)

    return (
        <>

            <Layout breadcrumbTitleParent="Sessions" breadcrumbTitle="Club Sessions">
                <div className="wg-box">
                    {/*} <div className="flex items-center justify-between gap10 flex-wrap">
                        <div className="wg-filter flex-grow">
                            <form className="form-search">
                                <fieldset className="name">
                                    <input type="text" placeholder="Search here..." name="name" tabIndex={2} aria-required="true" required />
                                </fieldset>
                                <div className="button-submit">
                                    <button type="submit"><i className="icon-search" /></button>
                                </div>
                            </form>
                        </div>
                        <Link className="tf-button style-1 w208" href="/create-session"><i className="icon-plus" />Create Session</Link>
                    </div> */}
                    <div className="wg-table table-all-category">
                        <ul className="table-title flex gap20 mb-14">
                            <li>
                                <div className="body-title">Name</div>
                            </li>
                            <li>
                                <div className="body-title">Location</div>
                            </li>
                            <li>
                                <div className="body-title">Days</div>
                            </li>
                            <li>
                                <div className="body-title">Price</div>
                            </li>
                            <li>
                                <div className="body-title">Action</div>
                            </li>
                        </ul>
                        <ul className="flex flex-column">
                            {sessions.map(function (session, i) {
                                return (
                                    <li className="product-item gap14">
                                        <div className="image no-bg">
                                            <img src="/images/bg-menu/serve.png" alt="" />
                                        </div>
                                        <div className="flex items-center justify-between gap20 flex-grow">
                                            <div className="name">
                                                <Link href="/product-list" className="body-title-2">{session.name}</Link>
                                            </div>
                                            <div className="body-text">{session.location}</div>
                                            <div className="body-text">$1,452.500</div>
                                            <div className="body-text">£{session.price}</div>
                                            <div className="list-icon-function">
                                                <div className="item eye">
                                                    <i className="icon-eye" />
                                                </div>
                                                <div className="item edit">
                                                    <i className="icon-edit-3" />
                                                </div>
                                                <div className="item trash">
                                                    <i className="icon-trash-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="divider" />

                    <Pagination users={totalSessions.length} itemsPerPage={itemsPerPage} />


                </div>


            </Layout >
        </>
    )
}