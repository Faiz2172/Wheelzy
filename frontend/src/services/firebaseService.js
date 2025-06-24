// services/firebaseService.js
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  getDocs, 
  getDoc,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../firebase.js'; // Update this path to your firebase config

class FirebaseService {
  constructor() {
    this.carListingsCollection = collection(db, 'carListings');
  }

  // Add a new car listing
  async addCarListing(listingData) {
    const docRef = await addDoc(this.carListingsCollection, {
      ...listingData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    // Get the document after adding to return the ID and full data
    const docSnap = await getDoc(docRef);
    return { id: docRef.id, ...docSnap.data() };
  }

  // Get all car listings for a specific user by email
  async getCarListingsByEmail(email) {
    const q = query(this.carListingsCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      // Convert Firebase timestamps to JavaScript Date objects
      createdAt: doc.data().createdAt?.toDate(),
      updatedAt: doc.data().updatedAt?.toDate(),
    }));
  }

  // Get a specific car listing by ID
  async getCarListing(id) {
    const docRef = doc(this.carListingsCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate(),
        updatedAt: docSnap.data().updatedAt?.toDate(),
      };
    } else {
      throw new Error('Car listing not found');
    }
  }

  // Update a car listing
  async updateCarListing(id, updateData) {
    const docRef = doc(this.carListingsCollection, id);
    await updateDoc(docRef, {
      ...updateData,
      updatedAt: serverTimestamp(),
    });
    
    // Return the updated document
    return this.getCarListing(id);
  }

  // Delete a car listing
  async deleteCarListing(id) {
    const docRef = doc(this.carListingsCollection, id);
    await deleteDoc(docRef);
    return id;
  }
}

export const firebaseService = new FirebaseService();