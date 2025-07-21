import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { VideoData } from "../../mocks/dashboard_mockData/mockVideos";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import VideoCardOptions from "./VideoCardOptions";
import SvgIcon from "@/components/ui/svg-icon";
import { IconNames } from "@/assets/icons";
import { useResponsive } from "@/hooks/useResponsive";
interface VideoCardProps {
  video: VideoData;
  onClick?: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onClick }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const isLive = video.status.name === "Live";
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useResponsive();
  
  const truncateText = (text: string, maxLength: number = 50) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const handleDropdownToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking dropdown toggle
    setShowDropdown(!showDropdown);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  // Placeholder functions for dropdown actions
  const handleEdit = () => {
    console.log("Edit stream clicked for:", video.title);
    handleDropdownClose();
  };

  const handleExport = () => {
    console.log("Export JSON clicked for:", video.title);
    handleDropdownClose();
  };

  const handleViewDetails = () => {
    console.log("Views details clicked for:", video.title);
    handleDropdownClose();
  };

  const handleActivityLogs = () => {
    console.log("Activity logs clicked for:", video.title);
    handleDropdownClose();
  };

  const handleDelete = () => {
    console.log("Delete clicked for:", video.title);
    handleDropdownClose();
  };


  return (
    <TooltipProvider>
      <Card
        className="bg-[#1A1B1E] overflow-hidden group cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-600"
        style={{ borderRadius: "12px" }}
        onClick={onClick}
      >
        <div className="relative">
          {/* Thumbnail */}
          <div
            className={`aspect-video bg-gray-700 overflow-hidden ${isLive ? "border-2 border-red-500" : ""
              }`}
            style={{ borderRadius: "12px 12px 12px 12px" }}
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
              className="cursor-pointer hover:opacity-80 transition-opacity"
              style={{ borderRadius: "5px" }}
              onClick={handleDropdownToggleClick}
            >
              <SvgIcon
                name={IconNames.THREE_DOTS}
                width={isMobile ? 24 : 30}
                height={isMobile ? 18 : 24}
              />
            </div>

            {/* Render the VideoCardOptions component */}
            <VideoCardOptions
              isOpen={showDropdown}
              onClose={handleDropdownClose}
              onEdit={handleEdit}
              onExport={handleExport}
              onViewDetails={handleViewDetails}
              onActivityLogs={handleActivityLogs}
              onDelete={handleDelete}
            />
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
          <Tooltip>
            <TooltipTrigger asChild>
              <h3 className="font-semibold text-sm mb-2 line-clamp-2 text-white leading-5 cursor-help">
                {truncateText(video.title)}
              </h3>
            </TooltipTrigger>
            <TooltipContent>
              <p>{video.title}</p>
            </TooltipContent>
          </Tooltip>
          <p className="text-xs text-gray-400 mb-3">
            {video.date} / {video.time}
          </p>
          <div className="flex items-center justify-between">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge
                  className="text-xs font-medium px-2 py-1 rounded-md cursor-help"
                  style={{
                    backgroundColor: video.category.color,
                    color: "#FFF",
                  }}
                >
                  {video.category.name}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>{video.category.name}</p>
              </TooltipContent>
            </Tooltip>
            <Badge
              variant="secondary"
              className="bg-[#252525] text-gray-300 text-xs rounded-md"
            >
              {video.clips} clips
            </Badge>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
};

export default VideoCard;