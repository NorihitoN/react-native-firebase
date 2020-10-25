import * as firebase from "firebase";
export type User ={
    id?: string;
    name: string;
    updatedAt: firebase.firestore.Timestamp;
    createAt: firebase.firestore.Timestamp;
}

export const initialUser: User = {
    name: "",
    updatedAt: firebase.firestore.Timestamp.now(),
    createAt: firebase.firestore.Timestamp.now(),
 }