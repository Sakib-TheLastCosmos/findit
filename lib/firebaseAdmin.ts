import admin from "firebase-admin";
import path from "path";
import fs from "fs";

if (!admin.apps.length) {
  const serviceAccountPath = path.join(process.cwd(), "service-account.json");
  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

// Firestore instance
export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;

export default admin;
