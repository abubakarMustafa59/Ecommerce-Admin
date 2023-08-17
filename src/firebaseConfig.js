import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig={
  apiKey: "AIzaSyBcA6Dp9xtFz72dFWzBIPiUofrkMoa8Ons",
  authDomain: "mystore-edcfc.firebaseapp.com",
  projectId: "mystore-edcfc",
  storageBucket: "mystore-edcfc.appspot.com",
  messagingSenderId: "124466506461",
  appId: "1:124466506461:web:568e022c5bbf993ca20934",
  measurementId: "G-F9KRJ7EGNK"
};
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);