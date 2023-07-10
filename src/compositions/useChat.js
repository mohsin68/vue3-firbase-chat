import { db } from "@/firebase";
import useAuth from "./useAuth";
import {ref , onUnmounted} from "vue";
import { collection, addDoc, serverTimestamp, orderBy, query, onSnapshot } from "firebase/firestore";

const messagesCollection = collection(db, "messages");
const messagesQuery = query(messagesCollection, orderBy("createdAt", "desc"));

export default function useChat() {
    const { user, isLogin } = useAuth();
    const messages = ref([]);
    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
        messages.value = snapshot.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .reverse();
    });

    onUnmounted(unsubscribe);

    const sendMessage = async (text) => {
        if (!isLogin) return;
        await addDoc(messagesCollection, {
            userName: user.value.displayName,
            userId: user.value.uid,
            text: text,
            userPhotoURL: user.value.photoURL,
            createdAt: serverTimestamp(),
        });
    };

    return { messages, sendMessage };
}