import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import {
  onAuthStateChanged, signOut,
  signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile,
  type User
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";

type Ctx = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (email: string, pass: string, name?: string) => Promise<void>;
  signOutApp: () => Promise<void>;
};
const AuthCtx = createContext<Ctx>({} as Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() =>
    onAuthStateChanged(auth, (u) => { setUser(u); setLoading(false); }),
  []);

  const signIn = (email: string, pass: string) =>
    signInWithEmailAndPassword(auth, email, pass).then(() => {});

  const signUp = async (email: string, pass: string, name?: string) => {
    const { user } = await createUserWithEmailAndPassword(auth, email, pass);
    if (name) await updateProfile(user, { displayName: name });
    await setDoc(doc(db, "users", user.uid), {
      email: user.email, name: name ?? "", createdAt: serverTimestamp(),
    }, { merge: true });
  };

  const signOutApp = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, loading, signIn, signUp, signOutApp }}>
      {children}
    </AuthCtx.Provider>
  );
}
export const useAuth = () => useContext(AuthCtx);
