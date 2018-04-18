
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

import {
    userApp,
    UserTriggerFirestore
} from "./user"

admin.initializeApp(functions.config().firebase);

export const users = functions.https.onRequest(userApp);

export const userOnnWrite = functions.firestore.document(UserTriggerFirestore.path).onWrite(UserTriggerFirestore.onWrite);
export const userOnUpdate = functions.firestore.document(UserTriggerFirestore.path).onUpdate(UserTriggerFirestore.onUpdate);
export const userOnCreate = functions.firestore.document(UserTriggerFirestore.path).onCreate(UserTriggerFirestore.onCreate);
export const userOnDelete = functions.firestore.document(UserTriggerFirestore.path).onDelete(UserTriggerFirestore.onDelete);


export const helloWorld = functions.https.onRequest(async (request, response) => {
    return "hello"
});