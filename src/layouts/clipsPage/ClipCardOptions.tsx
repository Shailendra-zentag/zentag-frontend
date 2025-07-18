// components/ClipCardOptions.tsx
import React, { useRef, useEffect } from "react";
import { Download, Share2, Edit, Trash2, EyeIcon } from "lucide-react";

interface ClipCardOptionsProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
}

const ClipCardOptions: React.FC<ClipCardOptionsProps> = ({
  showDropdown,
  setShowDropdown,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowDropdown]); // Add setShowDropdown to dependency array

  if (!showDropdown) {
    return null; // Don't render if dropdown is not visible
  }

  return (
    <div
      className="absolute z-[100] top-10 right-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-2 shadow-xl min-w-[150px] calendar-scroll"
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
    >
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Edit size={14} />
        Edit stream
      </button>
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Download size={14} />
        Export JSON
      </button>
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <EyeIcon size={14} />
        Views details
      </button>
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Share2 size={14} />
        Activity logs
      </button>
      <hr className="border-[#2A2A2A] my-1" />
      <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default ClipCardOptions;