import { db } from "./firebase";
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import CryptoJS from "crypto-js";

// SECRET KEY for encryption (Keep this safe, or derive it from user login)
const SECRET_KEY = "XecureVault123!@#"; // Change this to something more secure

// Function to encrypt password
const encryptPassword = (password) => {
  return CryptoJS.AES.encrypt(password, SECRET_KEY).toString();
};

// Function to decrypt password
const decryptPassword = (encryptedPassword) => {
  const bytes = CryptoJS.AES.decrypt(encryptedPassword, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};

// Save password to Firestore
export const savePassword = async (userId, website, username, password) => {
  try {
    const encryptedPassword = encryptPassword(password); // Encrypt before saving
    await addDoc(collection(db, "passwords"), {
      userId,
      website,
      username,
      password: encryptedPassword,
    });
    console.log("Password saved successfully!");
  } catch (error) {
    console.error("Error saving password:", error);
  }
};

// Fetch passwords from Firestore (Only for logged-in user)
export const fetchPasswords = async (userId) => {
  try {
    const q = query(collection(db, "passwords"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const passwords = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      website: doc.data().website,
      username: doc.data().username,
      password: decryptPassword(doc.data().password), // Decrypt when fetching
    }));
    return passwords;
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return [];
  }
};
