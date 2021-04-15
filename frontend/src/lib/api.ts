import firebase from "firebase/app";
import "firebase/firestore";
import { Homete } from "../types/Homete";
import { User } from "../types/User";

export const loginWithTwitter = async (): Promise<firebase.auth.UserCredential> => {
  const auth = firebase.auth();
  const provider = new firebase.auth.TwitterAuthProvider();
  try {
    const result = await auth.signInWithPopup(provider);
    return result;
  } catch (e) {
    console.error(e);
  }
};

export const logout = async (): Promise<void> => {
  const auth = firebase.auth();
  try {
    await auth.signOut();
  } catch (e) {
    console.error(e);
  }
};

export const setUserByUid = async (uid: string, user: User): Promise<void> => {
  const db = firebase.firestore();
  db.collection("users").doc(uid).set(user);
};

export const getUserByScreenName = async (
  screenName: string,
): Promise<User> => {
  const db = firebase.firestore();
  const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await db
    .collection("users")
    .where("screen_name", "==", screenName)
    .get();
  const user: User = querySnapshot.docs[0].data() as User;

  return user;
};

export const getHometes = async (screenName: string): Promise<Homete[]> => {
  const db = firebase.firestore();
  const querySnapshot: firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData> = await db
    .collection("hometes")
    .orderBy("timestamp", "desc")
    .where("recipient", "==", screenName)
    .get();

  return querySnapshot.docs.map(
    (doc) => ({ id: doc.id, ...doc.data() } as Homete),
  );
};

export const getHometeById = async (docId: string): Promise<Homete> => {
  const db = firebase.firestore();
  const doc: firebase.firestore.DocumentSnapshot<firebase.firestore.DocumentData> = await db
    .collection("hometes")
    .doc(docId)
    .get();

  return doc.data() as Homete;
};

export const setHomete = async ({
  recipient,
  description,
}: {
  recipient: string;
  description: string;
}): Promise<void> => {
  const db = firebase.firestore();
  await db.collection("hometes").doc().set({
    recipient: recipient,
    description: description,
    resolved: false,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
  });
};

export const getContributorByScreenName = async (
  screenName: string,
): Promise<string> => {
  const db = firebase.firestore();
  const querySnapshot = await db
    .collection("contributors")
    .where("screen_name", "==", screenName)
    .get();

  if (querySnapshot.empty) {
    return null;
  } else {
    const description = querySnapshot.docs[0].data().description;
    return description;
  }
};

export const approveHomete = async (id: string): Promise<void> => {
  const db = firebase.firestore();
  await db.collection("hometes").doc(id).update({
    resolved: true,
  });
};

export const deleteHomete = async (id: string): Promise<void> => {
  const db = firebase.firestore();
  await db.collection("hometes").doc(id).delete();
};

export default {};
