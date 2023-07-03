import router from '@/router';
import { auth, provider } from '../firebase';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { ref, computed, onUnmounted } from 'vue';

const LOCAL_STORAGE_KEY = 'chatAppUser';

export default () => {
  const user = ref(null);
  const unsubscribe = onAuthStateChanged(auth, (_user) => {
    user.value = _user;
    if (_user) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(_user));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    }
  });
  onUnmounted(unsubscribe);

  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push('/chat');

    } catch (error) {
      console.log(error.message);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const autoLogin = () => {
    const userData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (userData) {
      const parsedData = JSON.parse(userData);
      user.value = parsedData;
      router.push('/chat');
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
