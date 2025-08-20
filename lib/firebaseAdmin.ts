import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    } as admin.ServiceAccount), // optional type casting
  });
}

// Firestore instance
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;

export default admin;
