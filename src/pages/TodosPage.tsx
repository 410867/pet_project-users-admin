import { useState } from "react";
import { CircleX } from "lucide-react";
import { useAddTodo, useDeleteTodo, useGetTodos, useUpdateTodo } from "@/hooks/todos";

export default function TodosPage() {
  const { data, isLoading } = useGetTodos();
  const add = useAddTodo();
  const upd = useUpdateTodo();
  const del = useDeleteTodo();

  const [title, setTitle] = useState("");

  const [editId, setEditId] = useState<string | null>(null);
  const [editVal, setEditVal] = useState("");

  if (isLoading) return <div className="p-8">Loading…</div>;

  const startEdit = (id: string, cur: string) => {
    setEditId(id);
    setEditVal(cur);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditVal("");
  };

  const saveEdit = async () => {
    if (!editId) return;
    const trimmed = editVal.trim();
    if (trimmed.length === 0) {
      cancelEdit();
      return;
    }
    await upd.mutate({ id: editId, patch: { title: trimmed } });
    cancelEdit();
  };

  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-center tracking-[0.3em] font-semibold mb-6">TODOS</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="border px-3 py-2 flex-1"
          placeholder="New todo..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && title.trim()) {
              add.mutate(title.trim());
              setTitle("");
            }
          }}
        />
        <button
          className="px-4 py-2 bg-slate-900 text-white cursor-pointer"
          onClick={() => {
            if (title.trim()) add.mutate(title.trim());
            setTitle("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {(data ?? []).map((t: any) => {
          const isEditing = editId === t.id;
          return (
            <li
              key={t.id}
              className="border rounded px-3 py-2 flex items-center gap-3"
            >
              <input
                type="checkbox"
                checked={!!t.done}
                onChange={() =>
                  upd.mutate({ id: t.id, patch: { done: !t.done } })
                }
              />

              {isEditing ? (
                <input
                  autoFocus
                  className="border px-2 py-1 flex-1"
                  value={editVal}
                  onChange={(e) => setEditVal(e.target.value)}
                  onBlur={saveEdit}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") saveEdit();
                    if (e.key === "Escape") cancelEdit();
                  }}
                />
              ) : (
                <button
                  className={
                    "text-left flex-1 cursor-pointer " +
                    (t.done ? "line-through text-slate-400" : "")
                  }
                  title="Double-click to edit"
                  onDoubleClick={() => startEdit(t.id, t.title)}
                >
                  {t.title}
                </button>
              )}

              {!isEditing ? (
                <button
                  className="text-sm px-2 py-1 border rounded hover:bg-gray-50 cursor-pointer"
                  onClick={() => startEdit(t.id, t.title)}
                >
                  Edit
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    className="text-sm px-2 py-1 border rounded bg-slate-900 text-white cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      saveEdit();
                    }}
                  >
                    Save
                  </button>
                  <button
                    className="text-sm px-2 py-1 border rounded cursor-pointer"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      cancelEdit();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}

              <button
                onClick={() => del.mutate(t.id)}
                className="ml-2 text-red-600 cursor-pointer"
                title="Delete"
              >
                <CircleX />
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
