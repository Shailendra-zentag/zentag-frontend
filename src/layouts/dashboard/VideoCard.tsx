import React, { useState, useRef, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Play,
  Download,
  Share2,
  Edit,
  Trash2,
  EyeIcon,
} from "lucide-react";
import { VideoData } from "../../mockData/dashboard_mockData/mockVideos";

interface VideoCardProps {
  video: VideoData;
  onClick?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLive = video.status.name === "Live";
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
  }, []);

  return (
    <Card
      className="bg-[#1A1B1E] overflow-hidden group cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-600"
      style={{ borderRadius: "12px" }}
      onClick={onClick}
    >
      <div className="relative">
        {/* Thumbnail */}
        <div
          className={`aspect-video bg-gray-700 overflow-hidden ${
            isLive ? "border-2 border-red-500" : ""
          }`}
          style={{ borderRadius: "12px 12px 0 0" }}
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "/api/placeholder/320/180";
            }}
          />
        </div>

        {/* Overlay Badges (Role) */}
        <div className="absolute top-2 left-2">
          <Badge
            className="text-xs font-medium px-2 py-1 rounded-md"
            style={{
              backgroundColor: "#252525",
              color: "#FFF",
            }}
          >
            {video.role}
          </Badge>
        </div>

        {/* Dropdown for More options (3 dots) - repositioned */}
        <div className="absolute top-2 right-2 z-10" ref={dropdownRef}>
          <div
            className="w-7 h-6 bg-[#252525] hover:bg-[#3A3B3E] flex items-center justify-center cursor-pointer"
            style={{ borderRadius: "5px" }}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click when clicking dropdown toggle
              setShowDropdown(!showDropdown);
            }}
          >
            {/* The SVG for 3 dots */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="24"
              viewBox="0 0 30 24"
              fill="none"
            >
              <rect width="30" height="24" rx="5" fill="#252525" />
              <circle cx="8" cy="12" r="2" fill="#D9D9D9" />
              <circle cx="15" cy="12" r="2" fill="#D9D9D9" />
              <circle cx="22" cy="12" r="2" fill="#D9D9D9" />
            </svg>
          </div>

          {showDropdown && (
            <div className="absolute z-50 top-10 right-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg py-2 shadow-xl min-w-[150px] calendar-scroll">
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
          )}
        </div>

        {/* Live/Status Badge - positioned at bottom left inside thumbnail */}
        <div className="absolute bottom-2 left-2">
          {isLive ? (
            <div className="flex items-center justify-center px-2 py-1 bg-red-500 text-white text-xs font-medium rounded-md">
              Live
            </div>
          ) : (
            <div
              className="flex items-center justify-center px-2 py-1 text-xs font-medium rounded-md"
              style={{
                backgroundColor: video.status.background,
                color: video.status.color,
              }}
            >
              {video.status.name}
            </div>
          )}
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-white leading-5">
          {video.title}
        </h3>
        <p className="text-xs text-gray-400 mb-3">
          {video.date} / {video.time}
        </p>

        <div className="flex items-center justify-between">
          <Badge
            className="text-xs font-medium px-2 py-1 rounded-md"
            style={{
              backgroundColor: video.category.color,
              color: "#FFF",
            }}
          >
            {video.category.name}
          </Badge>

          <Badge
            variant="secondary"
            className="bg-[#252525] text-gray-300 text-xs rounded-md"
          >
            {video.clips} clips
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoCard;