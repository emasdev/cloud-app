import firebase from './FirebaseConfig';
import { setDoc, doc, getDoc, updateDoc, deleteDoc, getDocs, collection, where, query } from 'firebase/firestore';

const db = firebase.firestore;

const createDocument = (collection, id, docData) => {
  return setDoc(doc(db, collection, id), docData);
};

const readDocument = async (collection, id) => {
  const docRef = doc(db, collection, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log('no user data');
  }
};

const readDocuments = async (collectionName, userId) => {
  try {
    let data = [];
    const q = query(collection(db, collectionName), where("doctorId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      data.push({ ...doc.data(), id: doc.id });
    });

    return data;
  } catch (error) {
    throw error;
  }
};

const updateDocument = (collection, id, data) => {
  const docRef = doc(db, collection, id);
  return updateDoc(docRef, data);
};
// const deleteDocument = (collection, id) => {
//   return deleteDoc(doc(firestoreCollection(db, collection), id));
// };

const FirebaseFirestoreService = {
  createDocument,
  readDocument,
  updateDocument,
  readDocuments
  // deleteDocument,
};

export default FirebaseFirestoreService;
