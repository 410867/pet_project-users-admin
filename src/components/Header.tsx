import { NavLink } from "react-router-dom";

export default function Header() {
  const baseBtn =
    "inline-flex items-center justify-center h-[48px] w-[200px] py-[14px] px-[112px] " +
    "border border-[#C4C4C4] font-rubik font-light text-[14px] leading-[20px] tracking-[0.2px] text-black";

  const selectedBtn = "bg-[#C4C4C4] hover:bg-[#bdbdbd]";
  const defaultBtn = "bg-transparent hover:bg-gray-100";

  return (
    <header className="w-full border-b border-[#C4C4C4] bg-white">
      <div className="mx-auto max-w-5xl p-4">
        <nav className="flex-1 flex flex-col justify-center gap-2.5 sm:flex-row">
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
        </nav>
      </div>
    </header>
  );
}
