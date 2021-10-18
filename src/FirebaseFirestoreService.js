import firebase from './FirebaseConfig';
import { setDoc, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = firebase.firestore;

const createDocument = (collection, id, docData) => {
  return setDoc(doc(db, collection, id), docData);
};

const readDocument = async (collection, id) => {
  const docRef = doc(db, 'usuarios', id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    alert('no user data');
  }
};

// const updateDocument = (collection, id, document) => {
//   return updateDoc(
//     doc(firestoreCollection(db, collection), id),
//     document
//   );
// };
// const deleteDocument = (collection, id) => {
//   return deleteDoc(doc(firestoreCollection(db, collection), id));
// };

const FirebaseFirestoreService = {
  createDocument,
  readDocument,
  // updateDocument,
  // deleteDocument,
};

export default FirebaseFirestoreService;
