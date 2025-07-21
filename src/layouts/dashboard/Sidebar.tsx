import React, { useState, useRef, useEffect } from "react";
import {
  LogOut,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { CloudIcon } from "../../constants/DashboardPage";
import { HighlightsIcon } from "../../constants/DashboardPage";
import { sidebarItems, profileMenuItems } from "../../constants/DashboardPage"

const AIIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="25"
    viewBox="0 0 38 25"
    fill="none"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.1836 0C12.7511 0 14.1592 0.303792 15.407 0.911676C16.2464 1.31033 16.982 1.8129 17.615 2.41793V0.480048L24.8143 0.480048L24.8143 23.8069H17.615V21.9149C17.0017 22.4948 16.282 22.9819 15.455 23.3747C14.1749 23.9825 12.7511 24.2867 11.1836 24.2867C9.03969 24.2867 7.11963 23.7588 5.42375 22.7029C3.76003 21.647 2.43174 20.207 1.43954 18.3831C0.479844 16.5592 0 14.4792 0 12.1433C0 9.80754 0.479844 7.72752 1.43954 5.90363C2.43174 4.07977 3.76003 2.63976 5.42375 1.5838C7.11963 0.527933 9.03969 0 11.1836 0ZM10.7671 7.55488C9.70048 6.93915 8.3675 7.70878 8.3675 8.94037V15.314C8.3675 16.5455 9.70048 17.3152 10.7671 16.6994L16.287 13.5129C17.3536 12.897 17.3536 11.3573 16.287 10.7415L10.7671 7.55488Z"
      fill="url(#paint0_linear_2032_97)"
    />
    <path
      d="M37.9998 23.8066H30.656L30.656 0.479736L37.9998 0.479736V23.8066Z"
      fill="url(#paint1_linear_2032_97)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2032_97"
        x1="47.8493"
        y1="12.2874"
        x2="13.9042"
        y2="-22.3947"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00EEFF" />
        <stop offset="1" stopColor="#0051FF" />
      </linearGradient>
      <linearGradient
        id="paint1_linear_2032_97"
        x1="47.8501"
        y1="12.2871"
        x2="13.9049"
        y2="-22.395"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00EEFF" />
        <stop offset="1" stopColor="#0051FF" />
      </linearGradient>
    </defs>
  </svg>
);

const Sidebar: React.FC = () => {
  const [showProfilePopover, setShowProfilePopover] = useState(false);
  const profilePopoverRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profilePopoverRef.current &&
        !profilePopoverRef.current.contains(event.target as Node)
      ) {
        setShowProfilePopover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userId');
    window.location.href = '/login';
    setShowProfilePopover(false);
  };

  return (
    <div className="w-20 bg-[#000] flex flex-col h-full">
      {/* AI Logo */}
      <div className="flex justify-center pt-5 pb-8">
        <AIIcon />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-6">
        {sidebarItems.map((item, index) => {
          const isActive = location.pathname === item.path ||
            (item.path === "/dashboard" && location.pathname === "/");
          return (
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => navigate(item.path)}
            >
              <div
                className={`p-3 rounded-lg transition-colors ${isActive ? "bg-[#252525]" : "hover:bg-[#252525]"
                  }`}
              >
                {item.icon === HighlightsIcon || item.icon === CloudIcon ? (
                  <item.icon />
                ) : (
                  <item.icon className="w-6 h-6 text-white" />
                )}
              </div>
              <span className="text-white text-xs mt-2 text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </nav>
      {/* User Profile */}
      <div
        className="p-4 flex flex-col items-center relative"
        ref={profilePopoverRef}
      >
        <button
          onClick={() => setShowProfilePopover(!showProfilePopover)}
          className="w-12 h-12 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-full flex items-center justify-center mb-2 hover:bg-[#0F9488] transition-colors"
        >
          <span className="text-white text-lg font-medium">S</span>
        </button>
        <span className="text-white text-xs text-center">Shailendra</span>
        <span className="text-gray-400 text-xs text-center">Admin</span>

        {/* Profile Popover */}
        {showProfilePopover && (
          <div className="absolute bottom-0 left-full w-64 bg-[#2A2A2A] border border-[#373737] rounded-lg shadow-lg z-50">
            <div className="py-2">
              {/* Menu Items */}
              {profileMenuItems.map((item, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[#373737] transition-colors text-left"
                  onClick={() => {
                    console.log(`${item.label} clicked`);
                    setShowProfilePopover(false);
                  }}
                >
                  <item.icon className="w-5 h-5 text-gray-400" />
                  <span className="text-sm">{item.label}</span>
                </button>
              ))}

              {/* Divider */}
              <div className="border-t border-[#373737] my-2"></div>

              {/* User Info Section */}
              <div className="px-4 py-3 border-b border-[#373737]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">S</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Shailendra</div>
                    <div className="text-gray-400 text-xs">
                      shailendra@zentag.ai
                    </div>
                  </div>
                </div>
              </div>

              {/* Logout */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 text-white hover:bg-[#373737] transition-colors text-left"
                onClick={handleLogout}
              >
                <LogOut className="w-5 h-5 text-gray-400" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;