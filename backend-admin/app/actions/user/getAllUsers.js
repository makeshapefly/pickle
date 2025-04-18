import { db } from '@/app/firebase/firebase'
import { collection, query, where, getDocs } from "firebase/firestore";

export const getAllUsers = async (id) => {
    let users = []
    const q = query(collection(db, "user"), where("club", "==", id));
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach((doc) => {
        //console.log(doc.id, " => ", doc.data());
        users.push(doc.data())
    });

    return users
}
