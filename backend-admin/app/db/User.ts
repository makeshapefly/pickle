import { User } from '@/lib/database/types'

export interface WebUser {
    id: string
    firstName: string | null
    lastName: string | null
    email: string | null
    createdAt: Date | null
    organisation: number | null
    orgName: string | null
}

export function userToWebUser(user: any): WebUser {
    return {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        createdAt: user.created_at,
        organisation: user.organisation,
        orgName: user.org_name ? user.org_name : 'NONE'
    }
}