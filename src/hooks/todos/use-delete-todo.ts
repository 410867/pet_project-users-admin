import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { useAuth } from "@/features/auth/useAuth";

export function useDeleteTodo() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      deleteDoc(doc(db, "users", user!.uid, "todos", id)),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["todos", user?.uid] }),
  });
}
