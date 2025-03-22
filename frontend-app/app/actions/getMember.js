import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default getMember = async () => {
    let uid = auth().currentUser?.uid;

    const querySnapshot = await firestore()
      .collection('member')
      .where('uid', '==', uid)
      .get();

    let member = null;
    querySnapshot.forEach(documentSnapshot => {
      if (documentSnapshot.data().uid === uid) {
        member = documentSnapshot.data()
      }
    });
    return member
  }