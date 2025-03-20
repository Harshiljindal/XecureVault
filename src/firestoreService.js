import { db } from './firebase';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// Save password for a specific user

// Fetch passwords for the logged-in user
export const fetchPasswords = async (userId) => {
  try {
    const q = query(collection(db, `passwords/${userId}/userPasswords`));
    const querySnapshot = await getDocs(q);
    const passwords = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return passwords;
  } catch (error) {
    console.error('Error fetching passwords:', error);
    return [];
  }
};
export const savePassword = async (userId, website, username, password) => {
  try {
    console.log("Saving password for user:", userId);
    console.log("Data:", { website, username, password });

    await addDoc(collection(db, `passwords/${userId}/userPasswords`), {
      website,
      username,
      password,
      timestamp: new Date()
    });

    console.log('✅ Password saved successfully');
  } catch (error) {
    console.error('❌ Error saving password:', error);
  }
};
