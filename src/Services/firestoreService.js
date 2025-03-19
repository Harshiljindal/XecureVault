// src/services/firestoreService.js
import { db } from '../firebase';  // Import the Firestore instance from firebase.js

// Function to add a password
const addPassword = async (userId, website, username, password) => {
  try {
    await db.collection('passwords').add({
      userId,
      website,
      username,
      password,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    console.log('Password added successfully!');
  } catch (error) {
    console.error('Error adding password: ', error);
  }
};

// Function to retrieve all passwords for a specific user
const getPasswords = async (userId) => {
  try {
    const querySnapshot = await db
      .collection('passwords')
      .where('userId', '==', userId) // This ensures we only get passwords for the logged-in user
      .get();

    const passwords = querySnapshot.docs.map(doc => ({
      id: doc.id,  // Document ID
      ...doc.data(), // Document data
    }));

    return passwords;
  } catch (error) {
    console.error('Error getting passwords: ', error);
    return [];
  }
};

export { addPassword, getPasswords };
