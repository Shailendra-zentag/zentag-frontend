// components/ClipCardOptions.tsx
import React, { useRef, useEffect } from "react";
import { Download, Share2, Edit, Trash2, EyeIcon, PlusSquare, ScissorsIcon, FlipHorizontal, Image, UploadCloud, ArrowUp } from "lucide-react";
import { Rate } from "antd";

interface ClipCardOptionsProps {
  showDropdown: boolean;
  setShowDropdown: (show: boolean) => void;
  activeTab: string;
  clip: any; // Replace with actual clip type
  lazyLoad?: boolean; // Optional prop for lazy loading
  page: string;
}
const ClipCardOptions: React.FC<ClipCardOptionsProps> = ({
  showDropdown,
  setShowDropdown,
  activeTab,
  clip,
  lazyLoad,
  page,
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
      className="absolute z-[100] top-10 right-0 left-1 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-2 shadow-xl min-w-[200px] calendar-scroll"
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside dropdown
    >
      {/* Star Rating Section */}
      {(activeTab === "highlights" || page === "my-highlights") && (
        <div className="flex items-center justify-center py-4 border-[#373737]">
          <Rate
            defaultValue={clip.rating}
            onChange={(value) => console.log("Rating changed:", value)}
            style={{
              color: "#FFF",
            fontSize: "24px",
          }}
          className="custom-rate"
        />
      </div>)}
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <PlusSquare size={14} />
        Add tags
      </button>)}
      <hr className="border-[#2A2A2A] my-1" />
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <ScissorsIcon size={14} />
        Trim clip
      </button>)}
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <FlipHorizontal size={14} />
        Auto Flip
      </button>)}
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Image size={14} />
        Set Thumbnail
      </button>)}
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Download size={14} />
        Download
      </button>
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <UploadCloud size={14} />
        Publish
      </button>)}
      <button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Edit size={14} />
        Rename
      </button>
      {activeTab !== "highlights" && page !== "my-highlights" && (<button className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <ArrowUp size={14} />
        Export JSON
      </button>)}
      <button className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#2A2A2A] transition-colors flex items-center gap-2">
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default ClipCardOptions;