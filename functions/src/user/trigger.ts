import "reflect-metadata";
import {
    Change,
    EventContext
} from "firebase-functions";

import { firestore } from "firebase-admin";


export class UserTriggerFirestore {

    static path: string = "users/{userId}";

    static async onWrite(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const userBefore = change.before.exists ? change.before.data() : null;
        const userAfter = change.after.data();

        console.log(`[User] onWrite after -> ${userAfter} | before -> ${userBefore}`);

    };

    static async onUpdate(change: Change<firestore.DocumentSnapshot>, context?: EventContext) {

        const userBefore = change.before.data();
        const userAfter = change.after.data();

        console.log(`[User] update after -> ${userAfter} | before -> ${userBefore}`);


    };

    static async onCreate(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const user = snapshot.data();

        console.log(`[User] create -> ${user}`);

    };

    static async onDelete(snapshot: firestore.DocumentSnapshot, context?: EventContext) {

        const user = snapshot.data();

        console.log(`[User] delete -> ${user}`);

    };

}

