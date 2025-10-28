import { useState } from "react";
import AddUserModal from "../components/AddUserModal";

export default function UsersPage() {
  const [showAdd, setShowAdd] = useState(false);
  const addUser = () => {};

  return (
    <div>
      <h1>User Page</h1>
      <button
        onClick={() => setShowAdd(true)}
        className="px-4 py-2 bg-slate-900 text-white rounded"
      >
        Add User
      </button>
      <AddUserModal
        open={showAdd}
        onClose={() => setShowAdd(false)}
        onAdd={addUser}
      />
    </div>
  );
}
