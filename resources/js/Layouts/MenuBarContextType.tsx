import { MoreVertical, ChevronDown, ChevronUp } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";

// Type definition for MenuBar context
type MenuBarContextType = {
  expanded: boolean;
};

// Define default value for MenuBarContext
const MenuBarContext = createContext<MenuBarContextType | undefined>(undefined);

// Props for MenuBar component
interface MenuBarProps {
  children: ReactNode;
}

export default function MenuBar({ children }: MenuBarProps) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <header className="w-full fixed top-0 left-64 w-full h-16 z-10 bg-white shadow">
      <nav className="flex items-center justify-between p-4 border-b">
        {/* Logo and Toggle Button */}
        <div className="flex items-center">
          <img
            src="https://img.logoipsum.com/243.svg"
            className={`transition-all ${expanded ? "w-32" : "w-12"}`}
            alt="Logo"
          />
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="ml-3 p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>

        <MenuBarContext.Provider value={{ expanded }}>
          {/* Menu Items */}
          <ul className="flex space-x-4">{children}</ul>
        </MenuBarContext.Provider>

        {/* User Profile */}
        <div className="flex items-center space-x-2 border-l pl-3">
          <img
            src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <div className={`transition-all ${expanded ? "w-auto" : "w-0 overflow-hidden"}`}>
            <h4 className="font-semibold">John Doe</h4>
            <span className="text-xs text-gray-600">johndoe@gmail.com</span>
          </div>
          <MoreVertical size={20} />
        </div>
      </nav>
    </header>
  );
}

// Props for MenuBarItem component
interface MenuBarItemProps {
  icon: ReactNode;
  text: string;
  active?: boolean;
}

export function MenuBarItem({
  icon,
  text,
  active = false, // Default value
}: MenuBarItemProps) {
  const context = useContext(MenuBarContext);

  if (!context) {
    throw new Error("MenuBarItem must be used within a MenuBar");
  }

  const { expanded } = context;

  return (
    <li
      className={`
        flex items-center space-x-2 py-2 px-3 
        font-medium cursor-pointer
        rounded-md transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
      `}
    >
      {icon}
      {expanded && <span>{text}</span>}

      {!expanded && (
        <span
          className={`
            absolute bg-indigo-100 text-indigo-800 text-sm px-2 py-1 
            rounded shadow-lg transition-all transform scale-0 group-hover:scale-100
          `}
        >
          {text}
        </span>
      )}
    </li>
  );
}
