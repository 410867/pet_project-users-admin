import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAuth } from "@/features/auth/useAuth";

export function useAddTodo() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (title: string) =>
      addDoc(collection(db, "users", user!.uid, "todos"), {
        title,
        done: false,
        createdAt: serverTimestamp(),
      }),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["todos", user?.uid] }),
  });
}
