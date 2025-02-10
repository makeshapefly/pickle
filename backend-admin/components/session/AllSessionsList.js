"use client"

import React, { useState } from 'react';
import Link from "next/link"
import {
    Calendar as BigCalendar,
    momentLocalizer,
    Views
} from 'react-big-calendar'
import moment from 'moment'
//import 'react-big-calendar/lib/css/react-big-calendar.css';
import '/public/css/react-big-calendar.css'
import './custom.css'


const AllSessionsList = async (props) => {
    const [isTab2, setIsTab2] = useState(1)
    const handleTab2 = (i) => {
        setIsTab2(i)
    }

    const localizer = momentLocalizer(moment) // or globalizeLocalizer

    const [view, setView] = useState(Views.WEEK)
    const [date, setDate] = useState(new Date())
    const [eventsList, setEventsList] = useState([]);

    const handleNavigate = (newDate) => { setDate(newDate) }
    const handleViewChange = (newView) => { setView(newView) }

    const getSessions = (id) => {
        const session = props.sessions.find((element) => element.id == id)
        const startDate = session.start_date
        const endDate = session.end_date
        const startHours = startDate.getHours()
        const endHours = endDate.getHours()
        const startMinutes = startDate.getMinutes()
        const endMinutes = endDate.getMinutes()
        const daysMapper = new Map([['sunday', 0], ['monday', 1], ['tuesday', 2], ['wednesday', 3], ['thursday', 4], ['friday', 5], ['saturday', 6]])
        let days = []
        session.days_of_week.forEach(element => days.push(daysMapper.get(element)));

        //work out how far ahead to populate sessions
        let today = new Date()
        today.setHours(0)
        today.setMinutes(0)

        let sixMonthsAhead = new Date()
        sixMonthsAhead.setMonth(today.getMonth() + 6)
        let populateToDate = endDate < sixMonthsAhead ? endDate : sixMonthsAhead

        let events = [];
        while (today < populateToDate) {
            //check that today's date is after session start date           
            let calEvent = null
            if (days.includes(today.getDay())) {
                let eventStart = new Date()
                eventStart.setTime(today)
                eventStart.setHours(startHours)
                eventStart.setMinutes(startMinutes)
                //console.log("eventStart: " + eventStart.toString())

                let eventEnd = new Date()
                eventEnd.setTime(today)
                eventEnd.setHours(endHours)
                eventEnd.setMinutes(endMinutes)
                //console.log("eventEnd: " + eventEnd.toString())

                calEvent = {
                    id: session.id,
                    title: session.name,
                    start: eventStart,
                    end: eventEnd
                }
                events.push(calEvent)
            }

            today.setHours(today.getHours() + 24)
        }
        setEventsList(events)
    }

    return (
        <div>
            <div className="flex items-center justify-between gap10 flex-wrap mb-20">
                <div></div>
                <Link className="tf-button style-2 w230" href="/create-session"><i className="icon-plus" />Create Session</Link>
            </div>
            <div className="widget-tabs">
                <ul className="widget-menu-tab style-1">
                    <li className={isTab2 === 1 ? "item-title active" : "item-title"} onClick={() => handleTab2(1)}>
                        <span className="inner"><span className="h6">Club Sessions</span></span>
                    </li>
                    <li className={isTab2 === 2 ? "item-title active" : "item-title"} onClick={() => handleTab2(2)}>
                        <span className="inner"><span className="h6">Session Calendar</span></span>
                    </li>
                </ul>
                <div className="widget-content-tab">
                    <div className="widget-content-inner active" style={{ display: `${isTab2 === 1 ? "block" : "none"}` }}>
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
                                        <div className="body-title">Mon</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Tue</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Wed</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Thu</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Fri</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Sat</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Sun</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Status</div>
                                    </li>
                                    <li>
                                        <div className="body-title">Action</div>
                                    </li>
                                </ul>
                                <ul className="flex flex-column">
                                    {props.sessions.map(function (session, i) {
                                        console.log(session.days_of_week.includes("monday"))
                                        return (
                                            <li className="product-item gap14">
                                                <div className="image no-bg">
                                                    <img src="/images/bg-menu/serve.png" alt="" />
                                                </div>
                                                <div className="flex items-center justify-between gap20 flex-grow">
                                                    <div className="name">
                                                        <Link href="/product-list" className="body-title-2">{session.name} | {session.location}</Link>
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.days_of_week.includes("monday")
                                                            ? <div><img src="/images/bg-menu/check.svg" width="20" alt="" /></div>
                                                            : <div></div>
                                                        }
                                                    </div>
                                                    <div className="body-text">
                                                        {session.active ? (
                                                            <div class="block-available">Active</div>
                                                        ) : (
                                                            <div class="block-published">Pending</div>
                                                        )}
                                                    </div>
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


                        </div>
                    </div>
                </div>
                <div className="widget-content-tab">
                    <div className="widget-content-inner" style={{ display: `${isTab2 === 2 ? "block" : "none"}` }}>
                        <div style={{ background: '#FFF', padding: 20, marginBottom: 20 }}>
                            <div className="body-title mb-10">Select a session to populate the session calendar</div>
                            <select className
                                name="sessionName"
                                onChange={e => getSessions(e.target.value)}
                            >
                                <option value="0">Please select</option>
                                {props.sessions.map(
                                    (item) => <option value={item.id}>{item.name}</option>
                                )
                                }
                            </select>
                        </div>

                        <BigCalendar
                            selectable
                            localizer={localizer}
                            events={eventsList}
                            defaultView={Views.WEEK}
                            views={[Views.DAY, Views.WEEK, Views.MONTH]}
                            steps={60}
                            defaultDate={new Date(2018, 0, 29)}
                            view={view}
                            onView={handleViewChange}
                            date={date}
                            onNavigate={handleNavigate}
                            onSelectEvent={event => alert(JSON.stringify(event))}
                        />
                    </div>

                </div>
            </div>

        </div>
    )
};

export default AllSessionsList;