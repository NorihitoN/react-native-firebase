import * as functions from 'firebase-functions';

import {User} from "./types/user";
import admin = require("firebase-admin");

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();

exports.onUpdateUser = functions
    .region("asia-northeast1")
    .firestore.document("users/{userId}")
    .onUpdate(async (change, context) => {
        const {userId} = context.params;
        const newUser = change.after.data() as User;

        const db = admin.firestore();
        try {
            const snapshot = await db
                .collectionGroup("reviews")
                .where("user.id", "==", userId)
                .get();
            const batch = db.batch();
            snapshot.docs.forEach((reviewDoc) => {
                const user = {...reviewDoc.data().user, name: newUser.name};
                batch.update(reviewDoc.ref, {user});
            })
            await batch.commit();
        } catch(err) {
            console.log(err);
        }
    })