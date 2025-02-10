'use server'
import { insertSession } from '../db/SessionRepository'
import { db } from "@/lib/database/db";

export async function addSession(user, session) {
    let startDate = null
    let endDate = null
    let sessionDate = null

    if (session.startDate !== "") {
        startDate = session.startDate
    }
    if (session.endDate !== "") {
        endDate = session.endDate
    }
    if (session.sessionDate !== "") {
        sessionDate = session.endDate
    }
    const insertedSession = await insertSession(db, {
        name: session.name,
        location: session.location,
        recurring: session.recurring,
        start_date: startDate,
        end_date: endDate,
        session_date: sessionDate,
        days_of_week: session.days,
        active: session.active,
        people: session.people,
        price: session.price,
        config: session.config,
        created_at: '2024-12-06',
        organisation_id: user.organisation
    })

    console.log("insertedSession: " + JSON.stringify(insertedSession))

    return insertedSession
}