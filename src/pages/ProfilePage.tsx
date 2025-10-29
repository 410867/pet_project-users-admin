import { useAuth } from "@/features/auth/useAuth";

export default function ProfilePage() {
  const { user } = useAuth();
  return (
    <section className="max-w-3xl mx-auto p-6">
      <h2 className="text-center tracking-[0.3em] font-semibold mb-6">
        PROFILE
      </h2>
      {!user ? (
        <p>Not signed in.</p>
      ) : (
        <div className="space-y-2">
          <div>
            <span className="font-medium">UID:</span> {user.uid}
          </div>
          <div>
            <span className="font-medium">Email:</span> {user.email}
          </div>
          <div>
            <span className="font-medium">Name:</span> {user.displayName ?? "—"}
          </div>
        </div>
      )}
    </section>
  );
}
