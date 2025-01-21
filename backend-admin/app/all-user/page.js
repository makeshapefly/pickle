
import Layout from '@/components/layout/Layout'
import Link from "next/link"
import { getAllUsersByOrg, searchUsers } from '@/app/db/UserRepository'
import GetUser from "@/components/user/GetUser"
import { db } from "@/lib/database/db";
import { UserDelete } from '@/components/buttons/UserDelete'
import UserSearch from '@/components/user/UserSearch'
import Pagination from '@/components/user/Pagination';

export default async function AllUser(props) {

    const webUser = await GetUser()

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const page = searchParams?.page || '';

    const itemsPerPage = 1; //number of users displayed per page

    let users = []

    if (query) {
        users = await searchUsers(db, webUser.organisation, query, webUser.email, itemsPerPage, Number(page))
    } else {
        users = await getAllUsersByOrg(db, webUser.organisation, webUser.email, itemsPerPage, Number(page))
    }

    let totalUsers = await searchUsers(db, webUser.organisation, query, webUser.email, 2000000000, 0)

    return (
        <>

            <Layout breadcrumbTitleParent="User" breadcrumbTitle="All Users" attribute="All users" user={webUser}>
                <div className="wg-box">
                    <div className="flex items-center justify-between gap10 flex-wrap">
                        <UserSearch />
                        <Link className="tf-button style-1 w208" href="/add-new-user"><i className="icon-plus" />Add new</Link>
                    </div>
                    <div className="wg-table table-all-attribute">
                        <ul className="table-title flex gap20 mb-14">
                            <li>
                                <div className="body-title">Name</div>
                            </li>
                            <li>
                                <div className="body-title">Email</div>
                            </li>
                            <li>
                                <div className="body-title">Action</div>
                            </li>
                        </ul>
                        <ul className="flex flex-column">
                            {users.map(function (user, i) {
                                return (
                                    <li className="attribute-item flex items-center justify-between gap20">
                                        <div className="name">
                                            <Link href="#" className="body-title-2">{user.first_name} {user.last_name}</Link>
                                            <div className="text-tiny mt-3">Admin</div>
                                        </div>
                                        <div className="body-text">{user.email}</div>
                                        <div className="list-icon-function">
                                            <div className="item eye">
                                                {/* <i className="icon-eye" /> */}
                                            </div>
                                            <div className="item edit">
                                                <i className="icon-edit-3" />
                                            </div>
                                            <div className="item trash">
                                                <UserDelete user={user.id} />
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className="divider" />
                        <Pagination users={totalUsers.length} />
                    </div>
            </Layout>
        </>
    )
}