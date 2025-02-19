
import ChartList from "@/components/chart/ChartList"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
export default function Report() {

    return (
        <>

            <Layout breadcrumbTitleParent="Page" breadcrumbTitle="Report">
                <div>
                    <div className="tf-section-3 mb-30">
                        {/* chart-default */}
                        <div className="wg-chart-default">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap14">
                                    <div className="image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={52} viewBox="0 0 48 52" fill="none">
                                            <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#92BCFF" />
                                                    <stop offset={1} stopColor="#2377FC" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <i className="icon-shopping-bag" />
                                    </div>
                                    <div>
                                        <div className="body-text mb-2">Total Amount</div>
                                        <h4>34,945</h4>
                                    </div>
                                </div>
                                <div className="box-icon-trending up">
                                    <i className="icon-trending-up" />
                                    <div className="body-title number">1.56%</div>
                                </div>
                            </div>
                            <div className="wrap-chart">
                                <ChartList style={11} color="#BFDBFE" />
                            </div>
                        </div>
                        {/* /chart-default */}
                        {/* chart-default */}
                        <div className="wg-chart-default">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap14">
                                    <div className="image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={52} viewBox="0 0 48 52" fill="none">
                                            <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#92BCFF" />
                                                    <stop offset={1} stopColor="#2377FC" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <i className="icon-dollar-sign" />
                                    </div>
                                    <div>
                                        <div className="body-text mb-2">Total Revenue</div>
                                        <h4>$37,802</h4>
                                    </div>
                                </div>
                                <div className="box-icon-trending down">
                                    <i className="icon-trending-down" />
                                    <div className="body-title number">1.56%</div>
                                </div>
                            </div>
                            <div className="wrap-chart">
                                <ChartList style={11} color="#FFD4B1" />
                            </div>
                        </div>
                        {/* /chart-default */}
                        {/* chart-default */}
                        <div className="wg-chart-default">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap14">
                                    <div className="image">
                                        <svg xmlns="http://www.w3.org/2000/svg" width={48} height={52} viewBox="0 0 48 52" fill="none">
                                            <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                                            <defs>
                                                <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#92BCFF" />
                                                    <stop offset={1} stopColor="#2377FC" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <i className="icon-users" />
                                    </div>
                                    <div>
                                        <div className="body-text mb-2">Total Customer</div>
                                        <h4>34,945</h4>
                                    </div>
                                </div>
                                <div className="box-icon-trending">
                                    <i className="icon-trending-up" />
                                    <div className="body-title number">0.00%</div>
                                </div>
                            </div>
                            <div className="wrap-chart">
                                <ChartList style={11} color="#B8E1C7" />
                            </div>
                        </div>
                        {/* /chart-default */}
                    </div>
                    <div className="tf-section-2 mb-30">
                        {/* seller-statistic */}
                        <div className="wg-box">
                            <div className="flex items-center justify-between">
                                <h5>Seller statistic</h5>
                                <div className="flex gap10">
                                    <div className="select w160 ">
                                        <select className="h40">
                                            <option>Last 30 days</option>
                                            <option>Last 14 days</option>
                                            <option>Last 7 days</option>
                                        </select>
                                    </div>
                                    <Link className="tf-button-download" href="#"><i className="icon-download-cloud" /></Link>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap40">
                                <div>
                                    <div className="mb-2">
                                        <div className="block-legend">
                                            <div className="dot t1" />
                                            <div className="text-tiny">Revenue</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap10">
                                        <h4>$37,802</h4>
                                        <div className="box-icon-trending up">
                                            <i className="icon-trending-up" />
                                            <div className="body-title number">0.56%</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <div className="block-legend">
                                            <div className="dot t2" />
                                            <div className="text-tiny">Profit</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap10">
                                        <h4>$28,305</h4>
                                        <div className="box-icon-trending up">
                                            <i className="icon-trending-up" />
                                            <div className="body-title number">0.56%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ChartList style={12} />
                        </div>
                        {/* /seller-statistic */}
                        {/* total-sale */}
                        <div className="wg-box">
                            <div className="flex items-center justify-between">
                                <h5>Total sale</h5>
                                <div className="flex gap10">
                                    <div className="select w160 ">
                                        <select className="h40">
                                            <option>Last 30 days</option>
                                            <option>Last 14 days</option>
                                            <option>Last 7 days</option>
                                        </select>
                                    </div>
                                    <Link className="tf-button-download" href="#"><i className="icon-download-cloud" /></Link>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap40">
                                <div>
                                    <div className="mb-2">
                                        <div className="block-legend">
                                            <div className="dot t1" />
                                            <div className="text-tiny">Revenue</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap10">
                                        <h4>$37,802</h4>
                                        <div className="box-icon-trending up">
                                            <i className="icon-trending-up" />
                                            <div className="body-title number">0.56%</div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="mb-2">
                                        <div className="block-legend">
                                            <div className="dot t2" />
                                            <div className="text-tiny">Profit</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap10">
                                        <h4>$28,305</h4>
                                        <div className="box-icon-trending up">
                                            <i className="icon-trending-up" />
                                            <div className="body-title number">0.56%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <ChartList style={6} />
                        </div>
                        {/* /total-sale */}
                    </div>
                    {/* sale-purchase */}
                    <div className="wg-box mb-30">
                        <div className>
                            <h5>Sale / Purchase return</h5>
                            <div className="flex gap10">
                                <h4>$84.86B</h4>
                                <div className="box-icon-trending down">
                                    <i className="icon-trending-down" />
                                    <div className="body-title number">1.02%</div>
                                </div>
                            </div>
                        </div>
                        <ChartList style={13} />
                        <ChartList style={14} />
                    </div>
                    {/* /sale-purchase */}
                    {/* history */}
                    <div className="wg-box">
                        <h5>Transfer History</h5>
                        <div className="wg-table table-all-attribute">
                            <ul className="table-title flex gap20 mb-14">
                                <li>
                                    <div className="body-title">Transfer Id</div>
                                </li>
                                <li>
                                    <div className="body-title">Name</div>
                                </li>
                                <li>
                                    <div className="body-title">Date</div>
                                </li>
                                <li>
                                    <div className="body-title">Total</div>
                                </li>
                                <li>
                                    <div className="body-title">Action</div>
                                </li>
                            </ul>
                            <ul className="flex flex-column">
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">11081197</div>
                                    <div className="body-text">Kathryn Murphy</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">38766940</div>
                                    <div className="body-text">Floyd Miles</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">43397744</div>
                                    <div className="body-text">Brooklyn Simmons</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">66277431</div>
                                    <div className="body-text">Wade Warren</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">58276066</div>
                                    <div className="body-text">Devon Lane</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">93242854</div>
                                    <div className="body-text">Jenny Wilson</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">11081197</div>
                                    <div className="body-text">Jane Cooper</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">55700223</div>
                                    <div className="body-text">Albert Flores</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">34034474</div>
                                    <div className="body-text">Robert Fox</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                                <li className="attribute-item flex items-center justify-between gap20">
                                    <div className="body-text">34034474</div>
                                    <div className="body-text">Theresa Webb</div>
                                    <div className="body-text">Mar 20, 2023</div>
                                    <div className="body-text">$2,700</div>
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
                                </li>
                            </ul>
                        </div>
                        <div className="divider" />
                        <div className="flex items-center justify-between flex-wrap gap10">
                            <div className="text-tiny">Showing 10 to 16 in 30 records</div>
                            <ul className="wg-pagination">
                                <li>
                                    <Link href="#"><i className="icon-chevron-left" /></Link>
                                </li>
                                <li>
                                    <Link href="#">1</Link>
                                </li>
                                <li className="active">
                                    <Link href="#">2</Link>
                                </li>
                                <li>
                                    <Link href="#">3</Link>
                                </li>
                                <li>
                                    <Link href="#"><i className="icon-chevron-right" /></Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}