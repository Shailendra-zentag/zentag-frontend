import React, { useRef, useEffect } from "react";
import { Download, Share2, Edit, Trash2, EyeIcon } from "lucide-react";

interface VideoCardOptionsProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onExport: () => void;
  onViewDetails: () => void;
  onActivityLogs: () => void;
  onDelete: () => void;
}

const VideoCardOptions: React.FC<VideoCardOptionsProps> = ({
  isOpen,
  onClose,
  onEdit,
  onExport,
  onViewDetails,
  onActivityLogs,
  onDelete,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="absolute z-50 top-10 right-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-2 shadow-xl min-w-[150px] calendar-scroll" ref={dropdownRef}>
      <button
        className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2"
        onClick={onEdit}
      >
        <Edit size={14} />
        Edit stream
      </button>
      <button
        className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2"
        onClick={onExport}
      >
        <Download size={14} />
        Export JSON
      </button>
      <button
        className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2"
        onClick={onViewDetails}
      >
        <EyeIcon size={14} />
        Views details
      </button>
      <button
        className="w-full px-4 py-2 text-left text-white hover:bg-[#2A2A2A] transition-colors flex items-center gap-2"
        onClick={onActivityLogs}
      >
        <Share2 size={14} />
        Activity logs
      </button>
      <hr className="border-[#2A2A2A] my-1" />
      <button
        className="w-full px-4 py-2 text-left text-red-400 hover:bg-[#2A2A2A] transition-colors flex items-center gap-2"
        onClick={onDelete}
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default VideoCardOptions;