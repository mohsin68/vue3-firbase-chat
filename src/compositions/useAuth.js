import router from "@/router";
import { auth, provider, db } from "../firebase";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { ref, computed } from "vue";
import { collection, addDoc, query } from "firebase/firestore";
import useContacts from "./useContacts";

const LOCAL_STORAGE_KEY = "chatAppUser";
const users = collection(db, "users");
const usersQuery = query(users);

export default () => {
  const user = ref(null);
  const { allUsers } = useContacts();

  onAuthStateChanged(auth, (_user) => {
    user.value = _user;
    if (_user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  });

  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      if (user.value) {
        router.push("/chat");
        const currentUser = JSON.parse(
          localStorage.getItem(LOCAL_STORAGE_KEY)
        ).uid;
        if (allUsers.some((user) => user.userId === currentUser)) return;

        // add user to firestore
        addDoc(usersQuery, {
          userName: user.value.displayName,
          userId: user.value.uid,
          userPhotoURL: user.value.photoURL,
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const autoLogin = () => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (userData) {
      const parsedData = JSON.parse(userData);
      user.value = parsedData;
      router.push("/chat");
    }
  };

  // sign out and remove user from local storage after expiration time provided by firebase
  const autoLogout = () => {
    if (!user.value) return;
    const expirationTime = user.value.stsTokenManager.expirationTime;
    const timeLeft = expirationTime - Date.now();
    setTimeout(() => {
      signOutUser();
    }, timeLeft);
  };

  autoLogin();
  autoLogout();

  return { user, isLogin, signIn, signOut: signOutUser };
};
