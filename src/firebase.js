
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCbAnKAn0lhX6U3YdUJtgAycOSkF8YlL5E",
  authDomain: "kloth-ffea7.firebaseapp.com",
  projectId: "kloth-ffea7",
  storageBucket: "kloth-ffea7.appspot.com",
  messagingSenderId: "715679516240",
  appId: "1:715679516240:web:f18d8f28356848117c7355"
};

const app = initializeApp(firebaseConfig);
 export const storage =getStorage(app);