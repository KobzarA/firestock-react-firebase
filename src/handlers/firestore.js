import {
  setDoc,
  getDocs,
  doc,
  serverTimestamp,
  collection,
} from 'firebase/firestore';
import { db } from '../lib/firebase.config';

const Firestore = {
  readDocs: (...args) => {
    let [collection_name] = args;
    let docs = [];
    const ref = collection(db, collection_name);
    return new Promise(async resolve => {
      try {
        const snapshots = await getDocs(ref);

        console.log('Firestore readDocs');
        snapshots.forEach(doc => {
          const d = { ...doc.data(), id: doc.id };
          docs.push(d);
        });
        resolve(docs);
      } catch (error) {
        console.log(error);
      }
    });
  },
  writeDoc: (...args) => {
    const [inputs, collection_name] = args;

    return new Promise(async resolve => {
      const randomIndex = Math.floor(Math.random() * 100000000);
      try {
        const docRef = doc(db, collection_name, `${randomIndex}`);
        await setDoc(docRef, {
          title: inputs.title,
          path: inputs.path,
          createdAt: serverTimestamp(),
          user: inputs.user,
        });
        resolve('new doc succesfully installed');
      } catch (e) {}
    });
  },
};

export default Firestore;