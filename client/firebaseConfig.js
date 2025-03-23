// // firebaseConfig.ts
// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth,
//   getReactNativePersistence,
//   Auth,
//   getAuth 
// } from "firebase/auth";
// import { getStorage, FirebaseStorage } from "firebase/storage";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//   apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
// };

// // Initialize Firebasea
// const app = initializeApp(firebaseConfig);

// // Initialize Auth with persistence
// const auth: Auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });

// // Get storage instance
// const storage: FirebaseStorage = getStorage(app);

// export { app, auth, storage };

// import { initializeApp } from "firebase/app";
// import { 
//   initializeAuth,
//   getReactNativePersistence
// } from "firebase/auth/react-native";
// import { getFirestore } from "firebase/firestore"; // Add this
// import { getStorage } from "firebase/storage";
// import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

// const firebaseConfig = {
//     apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
//     authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
//   };

// const app = initializeApp(firebaseConfig);

// // Initialize services
// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(ReactNativeAsyncStorage)
// });
// const db = getFirestore(app); // Firestore database
// const storage = getStorage(app); // Storage for files

// export { auth, db, storage }; // Export Firestore as 'db'


import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };