import Layout from "@/components/layout/Layout"
import { getWithMembers, searchWithMembers } from '@/app/db/OrganisationRepository'
import GetUser from "@/components/user/GetUser"
import { db } from "@/lib/database/db";
import MemberSearch from "@/components/members/MemberSearch"
import Pagination from '@/components/user/Pagination';

export default async function MembersPage(props) {

    const webUser = await GetUser()

    //const [pageItems, setPageItems] = useState(10)

    const searchParams = await props.searchParams;
    const query = searchParams?.query || '';
    const page = searchParams?.page || '';

    let itemsPerPage = 2; //number of users displayed per page

    let members = []

    if (query) {
        const response = await searchWithMembers(db, webUser.organisation, query, itemsPerPage, Number(page))
        console.log(JSON.stringify(response))
        members = response.members
    } else {
        const response = await getWithMembers(db, webUser.organisation, itemsPerPage, Number(page))
        console.log("membesrs stuff: " + JSON.stringify(response))
        members = response.members
    }

    let totalMembers = await searchWithMembers(db, webUser.organisation, query, 2000000000, 0)
    console.log(totalMembers.members.length)

    return (
        <>

            <Layout breadcrumbTitleParent="" breadcrumbTitle="Members">
                <div className="wg-box">
                    <div className="flex items-center justify-between gap10 flex-wrap">
                        <div className="wg-filter flex-grow">
                            <div className="show">
                                <div className="text-tiny">Showing</div>
                                <div className="select">
                                    <select>
                                        <option>10</option>
                                        <option>20</option>
                                        <option>30</option>
                                    </select>
                                </div>
                                <div className="text-tiny">entries</div>
                            </div>
                            <div className="flex gap10">
                                <div className="select w200">
                                    <select className>
                                        <option>Bulk Action</option>
                                        <option>Action 1</option>
                                        <option>Action 2</option>
                                    </select>
                                </div>
                                <button className="tf-button style-1 w128">Filters</button>
                            </div>
                            <MemberSearch />
                        </div>
                        {/*<Link className="tf-button style-1 w208" href="#"><i className="icon-plus" />New</Link>*/}
                    </div>
                    <div className="wg-table table-countries wrap-checkbox">
                        <ul className="table-title flex gap20 mb-14">
                            <li>
                                <input className="total-checkbox" type="checkbox" />
                            </li>
                            <li>
                                <div className="body-title">First Name</div>
                            </li>
                            <li>
                                <div className="body-title">Last Name</div>
                            </li>
                            <li>
                                <div className="body-title">Phone No</div>
                            </li>
                            <li>
                                <div className="body-title">Email</div>
                            </li>
                            <li>
                                <div className="body-title">Status</div>
                            </li>
                            <li>
                                <div className="body-title">Action</div>
                            </li>
                        </ul>
                        <ul className="flex flex-column">
                            {members.map(function (member, i) {
                                return (
                                    <li className="countries-item">
                                        <div>
                                            <input className="checkbox-item" type="checkbox" />
                                        </div>
                                        <div className="body-text">{member.first_name}</div>
                                        <div className="body-text">{member.last_name}</div>
                                        <div className="body-text">{member.mobile_phone}</div>
                                        <div className="body-text">{member.email}</div>
                                        <div>
                                            <div className="block-published">Active</div>
                                        </div>
                                        <div>
                                            <div className="list-icon-function">
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
                    <Pagination users={totalMembers.members.length} itemsPerPage={itemsPerPage} />
                </div>

            </Layout>
        </>
    )
}