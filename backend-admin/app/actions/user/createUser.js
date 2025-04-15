import { db } from '@/app/firebase/firebase'
import { doc, setDoc } from "firebase/firestore";

export const createUser = async (user, firstName, lastName) => {
    await setDoc(doc(db, "user", user.uid),
        {
            uid: user.uid,
            email: user.email,
            first_name: firstName,
            last_name: lastName
        });
}