import { useAuth } from "@/features/auth/useAuth";
import { NavLink, useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();
  const { user, signOutApp } = useAuth();

  const baseBtn =
    "inline-flex items-center justify-center h-[48px] min-w-[200px] px-5 py-[14px] " +
    "border border-[#C4C4C4] font-rubik font-light text-[14px] leading-[20px] tracking-[0.2px] text-black";
  const selectedBtn = "bg-[#C4C4C4] hover:bg-[#bdbdbd]";
  const defaultBtn = "bg-transparent hover:bg-gray-100";

  const ghostBtn =
    "inline-flex items-center justify-center h-[40px] px-4 border border-[#C4C4C4] cursor-pointer " +
    "text-[14px] leading-[20px] tracking-[0.2px] hover:bg-gray-100";

  return (
    <header className="w-full border-b border-[#C4C4C4] bg-white">
      <div className="mx-auto max-w-5xl p-4">
        <nav className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
          <div className="flex flex-1 flex-col gap-2.5 sm:flex-row">
            <NavLink
              to="/edit-users"
              className={({ isActive }) =>
                `${baseBtn} ${isActive ? selectedBtn : defaultBtn}`
              }
            >
              Edit Users
            </NavLink>

            <NavLink
              to="/users"
              className={({ isActive }) =>
                `${baseBtn} ${isActive ? selectedBtn : defaultBtn}`
              }
            >
              Users
            </NavLink>

            <NavLink
              to="/todos"
              className={({ isActive }) =>
                `${baseBtn} ${isActive ? selectedBtn : defaultBtn}`
              }
            >
              Todos
            </NavLink>
          </div>

          <div className="flex items-center gap-2 sm:ml-4">
            {!user ? (
              <>
                <NavLink to="/auth?mode=login" className={ghostBtn}>
                  Login
                </NavLink>
                <NavLink to="/auth?mode=register" className={ghostBtn}>
                  Register
                </NavLink>
              </>
            ) : (
              <>
                <span className="hidden sm:inline text-sm text-[#5E626B] mr-1">
                  {user.email}
                </span>
                <NavLink to="/profile" className={ghostBtn}>
                  Profile
                </NavLink>
                <button
                  onClick={async () => {
                    await signOutApp();
                    nav("/auth?mode=login");
                  }}
                  className={ghostBtn}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
