import { db } from "@/firebase";
import useAuth from "./useAuth";
import { ref, onUnmounted } from "vue";
import { collection, addDoc, serverTimestamp, orderBy, query, onSnapshot, where } from "firebase/firestore";

const messagesCollection = collection(db, "messages");

const conversationsCollection = collection(db, "conversations");
const conversationsQuery = query(conversationsCollection, orderBy("createdAt", "desc"));

export default function useChat () {
    const { user } = useAuth();
    const { uid: userId, displayName: userName, photoURL: userPhotoURL } = user.value;
    const conversations = ref([]);
    const messages = ref([]);
    const receiver = ref(null);
    const activeConversationId = ref(null);


    const getConversationMessages = (conversationId) => {
        const conversationMessagesQuery = query(
            messagesCollection,
            orderBy("createdAt", "desc"),
            where("conversationId", "==", conversationId),
        );
        const unsubscribeConversationMessages = onSnapshot(conversationMessagesQuery, (querySnapshot) => {
            messages.value = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })).reverse();
        });
    };

    const unsubscribeConversations = onSnapshot(conversationsQuery, (querySnapshot) => {
        conversations.value = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
        }));
    });

    onUnmounted(unsubscribeConversations);

    const sendMessage = async (text, conversationId) => {
        if (!user.value) return;

        if (!conversationId) {
            const newConversationId = await createConversation();
            conversationId = newConversationId;
            activeConversationId.value = newConversationId;
            getConversationMessages(conversationId);
        }
        await addDoc(messagesCollection, {
            userName,
            userId,
            userPhotoURL,
            text,
            createdAt: serverTimestamp(),
            conversationId,
        });

        // push message to conversation messages
        getConversationMessages(conversationId);
    };

    const createConversation = async () => {
        const member1 = {
            userName,
            userId,
            userPhotoURL,
        };
        const conversation = await addDoc(conversationsCollection, {
            member1,
            member2: receiver.value,
            createdAt: serverTimestamp(),
        });
        return conversation.id;
    };

    const setActiveConversationId = (id) => {
        activeConversationId.value = id;
        getConversationMessages(id);
    };

    const setReceiver = (receiverData) => {
        receiver.value = receiverData;
    };

    return { sendMessage, conversations, createConversation, messages, activeConversationId, setActiveConversationId, receiver, setReceiver };
}
