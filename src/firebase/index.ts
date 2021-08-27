import * as admin from 'firebase-admin';

require('dotenv').config();

if (!admin.apps.length) {
  if (process.env.NODE_ENV === 'test') {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_CONFIG_TEST as string) as any
      ),
      databaseURL: process.env.FIREBASE_DATABASE_URL_TEST,
    });
  } else {
    admin.initializeApp({
      credential: admin.credential.cert(
        JSON.parse(process.env.FIREBASE_CONFIG as string) as any
      ),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }
}

export const get_uid = async (token: string) => {
  const ret = await admin.auth().verifyIdToken(token);
  return ret.uid;
};

export default admin;
