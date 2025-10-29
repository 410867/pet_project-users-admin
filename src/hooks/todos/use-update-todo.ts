import { useMutation, useQueryClient } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/features/auth/useAuth";

export function useUpdateTodo() {
  const { user } = useAuth();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({ id, patch }: { id: string; patch: Record<string, any> }) =>
      updateDoc(doc(db, "users", user!.uid, "todos", id), patch),
    onSuccess: () =>
      qc.invalidateQueries({ queryKey: ["todos", user?.uid] }),
  });
}
