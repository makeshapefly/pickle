"use client"

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { deleteUser } from '@/app/actions/deleteUser'

export function UserDelete(user) {
    const submit = () => {
        confirmAlert({
            //title: 'Confirm to submit',
            message: 'Delete User?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: async () => {
                        const result = await deleteUser(user.user)
                        if (result >= 1) {
                            alert("User Deleted")
                        }
                    }
                },
                {
                    label: 'No',
                }
            ]
        });
    };

    return (
        <>
            <i className="icon-trash-2" onClick={submit} />
        </>
    )
}