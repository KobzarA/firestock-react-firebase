import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase.config';

const Storage = {
  uploadFile: async media => {
    try {
      const mediaRef = ref(storage, `images/${media.title}`);
      return await uploadBytes(mediaRef, media.file).then(snapshot => {
        return {
          path: snapshot.metadata.fullPath,
          name: media.title,
        };
      });
    } catch (error) {
      console.log(error);
    }
  },
  downloadFile: async media => {
    try {
      const mediaRef = ref(storage, media.path);
      const fileURL = await getDownloadURL(mediaRef);
      return fileURL;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Storage;
