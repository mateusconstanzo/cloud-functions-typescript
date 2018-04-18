import { firestore } from "firebase-admin";
import { v4 as uuid } from "uuid";
import { Service } from "typedi";
import { QuerySnapshot } from "@google-cloud/firestore"


@Service()
export class UserRepository {

    docRef = firestore().collection("users");

    async findAll(): Promise<QuerySnapshot> {
        return this.docRef.get();
    }

    async save(username: string, password: string): Promise<string> {

        const id = uuid();

        await this.docRef.doc(id).set({
            id: id,
            username: username,
            password: password
        });

        return id;

    }

    async update(id: string, username: string, password: string): Promise<void> {
        this.docRef.doc(id).update({
            id: id,
            username: username,
            password: password
        });
    }

    async delete(id: string): Promise<void> {
        await this.docRef.doc(id).delete();
    }

    async findById(id: string): Promise<firestore.DocumentSnapshot> {
        return this.docRef.doc(id).get();
    }

}