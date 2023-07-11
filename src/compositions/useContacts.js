import { db } from "@/firebase";
import { collection, query, getDocs } from "firebase/firestore";
import { reactive } from "vue";

export default function useContacts () {

  const allUsers = reactive([]);
  const contacts = reactive([]);
  const q = query(collection(db, "users"));

  const getUsers = async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      allUsers.push(doc.data());
    }
    );
    const currentUser = JSON.parse(localStorage.getItem("chatAppUser"));
    if (!currentUser) return;
    return contacts.push(...allUsers.filter(user => user.userId !== currentUser.uid));
  };

  getUsers();


  return { allUsers, contacts };
}
