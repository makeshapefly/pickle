import { db } from '@/app/firebase/firebase'
import { doc, getDoc } from "firebase/firestore";

export const getUser = async (id) => {
    const docRef = doc(db, "user", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return docSnap.data()
    } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
    }
}


