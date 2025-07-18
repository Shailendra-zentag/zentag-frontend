import React, { useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipData } from "@/mocks/clips_mockData/mockClips";
import ClipCardOptions from "./ClipCardOptions";

interface ClipCardProps {
    clip: ClipData;
    onSelect?: (id: string, selected: boolean) => void;
    onClick?: () => void;
}

const ClipCard: React.FC<ClipCardProps> = ({ clip, onSelect, onClick }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [isSelected, setIsSelected] = useState(clip.selected || false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleCheckboxChange = (checked: boolean) => {
        setIsSelected(checked);
        onSelect?.(clip.id, checked);
    };

    const truncateText = (text: string, maxLength: number = 30) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    //   const renderStars = (rating: number) => {
    //     return Array.from({ length: 5 }, (_, index) => (
    //       <svg
    //         key={index}
    //         width="12"
    //         height="12"
    //         viewBox="0 0 12 12"
    //         fill="none"
    //         xmlns="http://www.w3.org/2000/svg"
    //         className="inline"
    //       >
    //         <path
    //           d="M5.46973 1.32049C5.66167 0.842504 6.33833 0.842503 6.53027 1.32048L7.67669 4.17532C7.75843 4.37886 7.94946 4.51766 8.16831 4.5325L11.2377 4.74062C11.7516 4.77546 11.9607 5.419 11.5654 5.74925L9.20456 7.72175C9.03623 7.86239 8.96327 8.08696 9.01678 8.29968L9.76733 11.2831C9.893 11.7827 9.34557 12.1804 8.90934 11.9065L6.30383 10.2708C6.11807 10.1541 5.88193 10.1541 5.69617 10.2707L3.09066 11.9065C2.65443 12.1804 2.107 11.7827 2.23267 11.2831L2.98322 8.29968C3.03674 8.08696 2.96377 7.86239 2.79544 7.72175L0.434597 5.74925C0.0393227 5.41899 0.24842 4.77546 0.762323 4.74062L3.8317 4.5325C4.05054 4.51766 4.24157 4.37886 4.32331 4.17532L5.46973 1.32049Z"
    //           fill={index < rating ? "#FFF" : "#666"}
    //         />
    //       </svg>
    //     ));
    //   };

    return (
        <TooltipProvider>
            <Card
                className="bg-[#1A1B1E] overflow-hidden group cursor-pointer transition-all duration-300 border border-transparent hover:border-gray-600"
                style={{ borderRadius: "12px" }}
                onClick={onClick}
            >
                <div className="relative">
                    {/* Thumbnail with selection border */}
                    <div
                        className={`aspect-video bg-gray-700 overflow-hidden relative ${isSelected ? "border-2 border-[#00BBFF] rounded-xl" : ""
                            }`}
                        style={{ borderRadius: "12px 12px 12px 12px" }}
                    >
                        <img
                            src={clip.thumbnail}
                            alt={clip.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/api/placeholder/320/180";
                            }}
                        />

                        {/* Editor Badge - Top Left (next to checkbox) */}
                        <div className="absolute top-2 left-2 z-10">
                            <Badge
                                className="text-xs font-medium px-2 py-1 rounded-md"
                                style={{
                                    backgroundColor: "#252525",
                                    color: "#FFF",
                                }}
                            >
                                Editor
                            </Badge>
                        </div>

                        {/* Checkbox for selection - Absolute positioned in thumbnail corner */}
                        <div
                            className="absolute bottom-1 left-2 z-20"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Checkbox
                                checked={isSelected}
                                onCheckedChange={handleCheckboxChange}
                                className="w-6 h-6 border-2 border-white bg-black/20 backdrop-blur-sm data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#00BBFF] data-[state=checked]:to-[#0051FF] data-[state=checked]:border-[#00BBFF]"
                            />
                        </div>

                        {/* Three-dot menu - Top Right */}
                        <div className="absolute top-2 right-2 z-20" ref={dropdownRef}>
                            <div
                                className="cursor-pointer hover:opacity-80 transition-opacity"
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

                            {/* ClipCardOptions component for the dropdown */}
                            <ClipCardOptions
                                showDropdown={showDropdown}
                                setShowDropdown={setShowDropdown}
                            />
                        </div>
                    </div>
                </div>

                <CardContent className="p-4">
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex items-center gap-2 mb-1">
                                {clip.hasAI && (
                                    <div className="flex-shrink-0 mb-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="13"
                                            viewBox="0 0 20 13"
                                            fill="none"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M5.8861 0C6.71112 0 7.4522 0.15989 8.10897 0.47983C8.55076 0.689648 8.93788 0.954157 9.27103 1.2726V0.252657L13.0602 0.252657L13.0602 12.5299H9.27103V11.5342C8.94828 11.8394 8.56945 12.0957 8.13419 12.3025C7.46048 12.6224 6.71112 12.7825 5.8861 12.7825C4.75773 12.7825 3.74717 12.5046 2.8546 11.9489C1.97896 11.3931 1.27986 10.6352 0.757651 9.6753C0.252549 8.71538 0 7.62062 0 6.39124C0 5.16187 0.252549 4.06711 0.757651 3.10717C1.27986 2.14725 1.97896 1.38935 2.8546 0.833578C3.74717 0.277859 4.75773 0 5.8861 0ZM5.66688 3.97625C5.10552 3.65219 4.40395 4.05725 4.40395 4.70546V8.05998C4.40395 8.70818 5.10552 9.11327 5.66688 8.78918L8.57209 7.11203C9.13346 6.78791 9.13346 5.97753 8.57209 5.65341L5.66688 3.97625Z"
                                                fill="url(#paint0_linear_ai_icon)"
                                            />
                                            <path
                                                d="M20.0001 12.5302H16.1349L16.1349 0.25293L20.0001 0.25293V12.5302Z"
                                                fill="url(#paint1_linear_ai_icon)"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_ai_icon"
                                                    x1="25.1839"
                                                    y1="6.46706"
                                                    x2="7.31798"
                                                    y2="-11.7867"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#00EEFF" />
                                                    <stop offset="1" stopColor="#0051FF" />
                                                </linearGradient>
                                                <linearGradient
                                                    id="paint1_linear_ai_icon"
                                                    x1="25.1844"
                                                    y1="6.46733"
                                                    x2="7.31854"
                                                    y2="-11.7864"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#00EEFF" />
                                                    <stop offset="1" stopColor="#0051FF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )}
                                {/* Event type icon */}
                                {/* <div className="flex items-center gap-2">
                                    {clip.event === "Foul" && (
                                        <svg
                                            width="10"
                                            height="13"
                                            viewBox="0 0 10 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M9.90476 13H0V11.7619C0 10.941 0.326105 10.1537 0.906574 9.57324C1.48704 8.99277 2.27433 8.66667 3.09524 8.66667H6.80952C7.63043 8.66667 8.41772 8.99277 8.99819 9.57324C9.57866 10.1537 9.90476 10.941 9.90476 11.7619V13ZM4.95238 7.42857C4.46461 7.42857 3.98162 7.3325 3.53099 7.14584C3.08035 6.95918 2.67089 6.68559 2.32598 6.34068C1.98108 5.99578 1.70749 5.58632 1.52083 5.13568C1.33417 4.68504 1.2381 4.20205 1.2381 3.71429C1.2381 3.22652 1.33417 2.74353 1.52083 2.29289C1.70749 1.84225 1.98108 1.43279 2.32598 1.08789C2.67089 0.742986 3.08035 0.469393 3.53099 0.282733C3.98162 0.0960728 4.46461 -7.26829e-09 4.95238 0C5.93747 1.4679e-08 6.88221 0.391325 7.57878 1.08789C8.27534 1.78445 8.66667 2.7292 8.66667 3.71429C8.66667 4.69938 8.27534 5.64412 7.57878 6.34068C6.88221 7.03725 5.93747 7.42857 4.95238 7.42857Z"
                                                fill="white"
                                            />
                                        </svg>
                                    )}
                                </div> */}
                                {/* Special highlight icon for certain clips */}
                                {/* {clip.tags.includes("Shots on target") && (
                                    <div className="absolute bottom-2 left-2">
                                        <svg
                                            width="13"
                                            height="13"
                                            viewBox="0 0 13 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.813 6.72926C8.61288 7.60808 7.60808 8.61288 6.72926 12.813C6.67709 13.0623 6.32291 13.0623 6.27074 12.813C5.39192 8.61288 4.38712 7.60808 0.186959 6.72926C-0.0623197 6.67709 -0.0623197 6.32291 0.186959 6.27074C4.38712 5.39192 5.39192 4.38712 6.27074 0.186959C6.32291 -0.0623197 6.67709 -0.0623197 6.72926 0.186959C7.60808 4.38712 8.61288 5.39192 12.813 6.27074C13.0624 6.32291 13.0624 6.67709 12.813 6.72926Z"
                                                fill="url(#paint0_linear_highlight)"
                                            />
                                            <defs>
                                                <linearGradient
                                                    id="paint0_linear_highlight"
                                                    x1="25.0679"
                                                    y1="6.5771"
                                                    x2="6.89386"
                                                    y2="-11.5968"
                                                    gradientUnits="userSpaceOnUse"
                                                >
                                                    <stop stopColor="#00EEFF" />
                                                    <stop offset="1" stopColor="#0051FF" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                    </div>
                                )} */}
                                <h3 className="font-bold text-base line-clamp-1 text-white leading-5 cursor-help flex-1">
                                    {truncateText(clip.title)}
                                </h3>
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{clip.title}</p>
                        </TooltipContent>
                    </Tooltip>

                    <p className="text-xs text-gray-400 mb-3">
                        {clip.date} / {clip.time}
                    </p>

                    {/* Timestamp, Duration, and Aspect Ratio */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <Badge
                            className="text-xs font-medium px-2 py-1 rounded-md"
                            style={{
                                backgroundColor: "#252525",
                                color: "#FFF",
                            }}
                        >
                            {clip.timestamp}
                        </Badge>
                        <Badge
                            className="text-xs font-medium px-2 py-1 rounded-md"
                            style={{
                                backgroundColor: "#252525",
                                color: "#FFF",
                            }}
                        >
                            {clip.duration}
                        </Badge>
                        <Badge
                            className="text-xs font-medium px-2 py-1 rounded-md"
                            style={{
                                backgroundColor: "#252525",
                                color: "#FFF",
                            }}
                        >
                            {clip.aspectRatio}
                        </Badge>
                    </div>

                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        {clip.tags.map((tag, index) => (
                            <Tooltip key={index}>
                                <TooltipTrigger asChild>
                                    <Badge
                                        className={`text-xs font-medium px-2 py-1 rounded-md text-white cursor-help ${clip.hasAI
                                            ? "bg-[#252525] border-2 border-[#00BBFF]"
                                            : "bg-[#252525]"
                                            }`}
                                    >
                                        {tag}
                                    </Badge>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tag}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                        {/* Rating and Status */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <svg
                                    width="15"
                                    height="15"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.46973 1.32049C5.66167 0.842504 6.33833 0.842503 6.53027 1.32048L7.67669 4.17532C7.75843 4.37886 7.94946 4.51766 8.16831 4.5325L11.2377 4.74062C11.7516 4.77546 11.9607 5.419 11.5654 5.74925L9.20456 7.72175C9.03623 7.86239 8.96327 8.08696 9.01678 8.29968L9.76733 11.2831C9.893 11.7827 9.34557 12.1804 8.90934 11.9065L6.30383 10.2708C6.11807 10.1541 5.88193 10.1541 5.69617 10.2707L3.09066 11.9065C2.65443 12.1804 2.107 11.7827 2.23267 11.2831L2.98322 8.29968C3.03674 8.08696 2.96377 7.86239 2.79544 7.72175L0.434597 5.74925C0.0393227 5.41899 0.24842 4.77546 0.762323 4.74062L3.8317 4.5325C4.05054 4.51766 4.24157 4.37886 4.32331 4.17532L5.46973 1.32049Z"
                                        fill="#FFF"
                                    />
                                </svg>
                                <span className="text-[15px] font-bold text-white mt-0.5">
                                    {clip.rating}
                                </span>
                            </div>
                        </div>
                    </div>

                </CardContent>
            </Card>
        </TooltipProvider>
    );
};

export default ClipCard;
