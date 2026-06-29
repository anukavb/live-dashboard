import "./Sidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaChartLine,
  FaClipboardList,
  FaCog,
  FaMoon,
  FaSun,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import useStore from "../store/useStore";

export default function Sidebar() {

  const sidebarCollapsed = useStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useStore((s) => s.toggleSidebar);

  const isDark = useStore((s) => s.isDark);
  const toggleTheme = useStore((s) => s.toggleTheme);

  const collaborators = useStore((s) => s.collaborators);

  const online = collaborators.filter(
    (c) => c.status !== "away"
  ).length;

  const menu = [
    {
      title: "Dashboard",
      icon: <FaHome />,
      path: "/"
    },
    {
      title: "Analytics",
      icon: <FaChartLine />,
      path: "/analytics"
    },
    {
      title: "Sprint Board",
      icon: <FaClipboardList />,
      path: "/sprint"
    },
    {
      title: "Settings",
      icon: <FaCog />,
      path: "/"
    }
  ];

  return (
    <aside
      className={`sidebar ${
        sidebarCollapsed ? "collapsed" : "expanded"
      }`}
    >
      <div>

        <div className="logo">

          {!sidebarCollapsed && (
            <h2>LiveCollab</h2>
          )}

          <button
            className="toggle-btn"
            onClick={toggleSidebar}
          >
            {sidebarCollapsed
              ? <FaChevronRight />
              : <FaChevronLeft />}
          </button>

        </div>

        <nav className="nav-links">

          {menu.map((item) => (

            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "nav-item active"
                  : "nav-item"
              }
            >

              {item.icon}

              {!sidebarCollapsed &&
                <span>{item.title}</span>
              }

            </NavLink>

          ))}

        </nav>

      </div>

      <div className="bottom-section">

        {!sidebarCollapsed && (

          <div className="online-box">

            <div className="online-title">
              ONLINE NOW
            </div>

            <div className="online-count">
              🟢 {online}
            </div>

          </div>

        )}

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >

          {isDark
            ? <FaSun />
            : <FaMoon />
          }

          {!sidebarCollapsed &&
            <span style={{marginLeft:10}}>
              Toggle Theme
            </span>
          }

        </button>

      </div>

    </aside>
  );

}