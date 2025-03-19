// src/firestore.js
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

export const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "yourCollection"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  } catch (error) {
    console.error("Error fetching Firestore data:", error);
  }
};
