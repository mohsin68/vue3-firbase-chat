import { db } from "@/firebase";
import useAuth from "./useAuth";
import { ref, onUnmounted, computed } from "vue";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  where,
  or,
} from "firebase/firestore";

const messagesCollection = collection(db, "messages");

const conversationsCollection = collection(db, "conversations");

export default function useChat() {
  const { user } = useAuth();
  const currentUser = computed(() => user.value);
  const {
    uid: userId,
    displayName: userName,
    photoURL: userPhotoURL,
  } = currentUser?.value;
  const conversations = ref([]);
  const messages = ref([]);
  const receiver = ref(null);
  const activeConversationId = ref(null);

  const orderedConversations = computed(() =>
    conversations.value.sort((a, b) => {
      return b?.updatedAt?.seconds - a?.updatedAt?.seconds;
    })
  );

  const getConversationMessages = (conversationId) => {
    const conversationMessagesQuery = query(
      messagesCollection,
      orderBy("createdAt", "desc"),
      where("conversationId", "==", conversationId)
    );

    const unsubscribeConversationMessages = onSnapshot(
      conversationMessagesQuery,
      (querySnapshot) => {
        messages.value = querySnapshot.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .reverse();
      }
    );
  };

  const setLastMessage = async (conversationId, message) => {
    const conversationRef = doc(conversationsCollection, conversationId);
    await updateDoc(conversationRef, {
      lastMessage: message,
      updatedAt: serverTimestamp(),
    });
  };

  const conversationsQuery = query(
    conversationsCollection,
    orderBy("createdAt", "desc"),
    or(
      where("member1.userId", "==", userId),
      where("member2.userId", "==", userId)
    )
  );

  const unsubscribeConversations = onSnapshot(
    conversationsQuery,
    (querySnapshot) => {
      conversations.value = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
    }
  );

  onUnmounted(unsubscribeConversations);

  const sendMessage = async (text, conversationId) => {
    if (!user.value) return;

    if (!conversationId) {
      const newConversationId = await createConversation();
      conversationId = newConversationId;
      activeConversationId.value = newConversationId;
      setLastMessage(conversationId, text);
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
    setLastMessage(conversationId, text);
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
    messages.value = [];
  };

  return {
    sendMessage,
    conversations,
    createConversation,
    messages,
    activeConversationId,
    setActiveConversationId,
    receiver,
    setReceiver,
    orderedConversations,
  };
}
