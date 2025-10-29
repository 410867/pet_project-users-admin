import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { useAuth } from "@/features/auth/useAuth";

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  createdAt?: any;
};

export function useGetTodos() {
  const { user } = useAuth();

  return useQuery<Todo[]>({
    queryKey: ["todos", user?.uid],
    enabled: !!user,
    queryFn: async () => {
      const q = query(
        collection(db, "users", user!.uid, "todos"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      return snap.docs.map(
        (d) => ({ id: d.id, ...(d.data() as Omit<Todo, "id">) }) as Todo
      );
    },
  });
}
