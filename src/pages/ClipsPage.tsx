import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/layouts/dashboard/Sidebar";
import ClipCard from "@/layouts/clipsPage/ClipCard";
import ClipFilters from "@/layouts/clipsPage/ClipFilters";
import ShimmerCard from "@/layouts/clipsPage/ClipShimmerCard";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ClipData, mockClipData } from "@/mocks/clips_mockData/mockClips";
import { mockHighlightsData, HighlightSection } from "@/mocks/clips_mockData/mockHighlights";
import { limitOptions } from "@/constants/Filter";
import RefreshButton from "@/containers/filters/RefreshButton";
import Pagination from "@/containers/filters/Pagination";

interface ClipsProps {
  page: string;
}

const Clips: React.FC<ClipsProps> = ({ page }) => {
    const navigate = useNavigate();
    const [clips, setClips] = useState<ClipData[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedClips, setSelectedClips] = useState<Set<string>>(new Set());
    const [activeTab, setActiveTab] = useState("clips");
    const [limitPerPage, setLimitPerPage] = useState("20");
    const [currentPage, setCurrentPage] = useState(1);
    const [highlightSections, setHighlightSections] = useState<
        HighlightSection[]
    >([]);
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setClips(mockClipData);
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // Simulate loading
        const timer = setTimeout(() => {
            setHighlightSections(mockHighlightsData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const renderClipsGrid = (clips: ClipData[]) => {
        if (loading) {
            return (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <ShimmerCard key={index} />
                    ))}
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {clips.map((clip) => (
                    <ClipCard
                        key={clip.id}
                        clip={clip}
                        onSelect={handleClipSelect}
                        page={page}
                        activeTab={activeTab}
                        isSelected={selectedClips.has(clip.id)}
                        onClick={() => console.log("Open clip:", clip.id)}
                        dropdownRef={dropdownRef}
                    />
                ))}
            </div>
        );
    };

    const renderSection = (section: HighlightSection) => (
        <div key={section.id} className="mb-12">
            <div className="flex items-center gap-3 mb-6">
                <h2 className="text-xl font-bold text-white">{section.title}</h2>
                <span className="text-xl font-medium text-white mb-2">{section.count}</span>
            </div>
            {renderClipsGrid(section.clips)}
        </div>
    );

    const handleClipSelect = (clipId: string, selected: boolean) => {
        const newSelectedClips = new Set(selectedClips);
        if (selected) {
            newSelectedClips.add(clipId);
        } else {
            newSelectedClips.delete(clipId);
        }
        setSelectedClips(newSelectedClips);
    };

    const handleSelectAll = () => {
        if (selectedClips.size === currentClips.length) {
            // If all current clips are selected, deselect all
            setSelectedClips(new Set());
        } else {
            // Select all current clips
            setSelectedClips(new Set(currentClips.map((clip) => clip.id)));
        }
    };

    const handleClear = () => {
        setSelectedClips(new Set());
    };

    const totalClips = clips.length;
    const selectedCount = selectedClips.size;
    const totalDuration = "00:08:32"; // Mock total duration

    // Pagination
    const itemsPerPage = parseInt(limitPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentClips = clips.slice(startIndex, endIndex);

    const truncateText = (text: string, maxLength: number = 50) => {
        if (text.length <= maxLength) return text;
        return text.substring(0, maxLength) + "...";
    };

    const videoTitle = "Bangladesh vs Bhutan | FIFA Friendly match";

    const handleRefresh = () => {
        console.log("Refreshed!");
    };

    return (
        <TooltipProvider>
            {/* <div className="h-screen bg-[#18191B] text-white flex overflow-hidden"> */}
            <div className="h-screen bg-[#18191B] text-white flex overflow-x-auto overflow-y-auto">

                <Sidebar />

                {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
                <div className="flex-1 flex flex-col min-h-screen overflow-auto">

                    {/* Header */}
                    <div className="bg-[#18191B] border-b border-[#252525] px-8 py-6">
                        <div className="flex items-center justify-between mb-4">
                            {/* Back button and title */}
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => navigate("/dashboard")}
                                    className="text-white hover:text-gray-300 transition-colors"
                                >
                                    <svg
                                        width="8"
                                        height="13"
                                        viewBox="0 0 8 13"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2.828 6.364L7.778 1.414L6.364 0L0 6.364L6.364 12.728L7.778 11.314L2.828 6.364Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <h1 className="text-2xl font-medium text-white cursor-help">
                                            {truncateText(videoTitle)}
                                        </h1>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{videoTitle}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </div>

                            {/* Right side buttons */}
                            <div className="flex items-center gap-4">
                                {/* Timer */}
                                <div className="flex items-center gap-2 text-white">
                                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">{"00:57:38"}</span>
                                </div>

                                {/* End Stream */}
                                <Button
                                    variant="outline"
                                    className="bg-[#1B1B1B] border-red-500 text-white hover:bg-red-500/10 h-11 px-6"
                                >
                                    End stream
                                </Button>

                                {/* Video Editor */}
                                <Button className="bg-gradient-to-r from-[#00BBFF] to-[#0051FF] text-white h-11 px-6 hover:opacity-90 transition-opacity">
                                    <svg
                                        width="15"
                                        height="12"
                                        viewBox="0 0 15 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2"
                                    >
                                        <path
                                            d="M10.9091 4.27202L14.4634 1.78338C14.5145 1.74756 14.5745 1.72645 14.6368 1.72236C14.699 1.71827 14.7612 1.73136 14.8166 1.7602C14.872 1.78903 14.9183 1.83251 14.9507 1.88589C14.983 1.93928 15.0001 2.00051 15 2.06293V10.2993C15.0001 10.3617 14.983 10.4229 14.9507 10.4763C14.9183 10.5297 14.872 10.5732 14.8166 10.602C14.7612 10.6309 14.699 10.6439 14.6368 10.6399C14.5745 10.6358 14.5145 10.6147 14.4634 10.5788L10.9091 8.0902V10.9538C10.9091 11.1347 10.8373 11.3081 10.7094 11.436C10.5815 11.5638 10.4081 11.6357 10.2273 11.6357H0.681818C0.500989 11.6357 0.327566 11.5638 0.1997 11.436C0.0718342 11.3081 0 11.1347 0 10.9538V1.40838C0 1.22755 0.0718342 1.05413 0.1997 0.926263C0.327566 0.798397 0.500989 0.726562 0.681818 0.726562H10.2273C10.4081 0.726562 10.5815 0.798397 10.7094 0.926263C10.8373 1.05413 10.9091 1.22755 10.9091 1.40838V4.27202ZM2.72727 3.45384V4.81747H4.09091V3.45384H2.72727Z"
                                            fill="white"
                                        />
                                        <path
                                            d="M2.04545 2.77202H4.77273V5.49929H2.04545V2.77202Z"
                                            fill="white"
                                        />
                                    </svg>
                                    Video editor
                                </Button>
                            </div>
                        </div>

                        {/* Tabs and Actions */}
                        <div className="flex items-center justify-between">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="bg-transparent p-0 h-auto">
                                    <TabsTrigger
                                        value="clips"
                                        className="bg-transparent text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none relative px-4 py-2"
                                    >
                                        Clips
                                        {activeTab === "clips" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-t"></div>
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="highlights"
                                        className="bg-transparent text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none relative px-4 py-2"
                                    >
                                        Highlights
                                        {activeTab === "highlights" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-t"></div>
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="web-stories"
                                        className="bg-transparent text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none relative px-4 py-2"
                                    >
                                        Web stories
                                        {activeTab === "web-stories" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-t"></div>
                                        )}
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="published"
                                        className="bg-transparent text-white data-[state=active]:bg-transparent data-[state=active]:text-white data-[state=active]:shadow-none relative px-4 py-2"
                                    >
                                        Published
                                        {activeTab === "published" && (
                                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded-t"></div>
                                        )}
                                    </TabsTrigger>
                                </TabsList>
                            </Tabs>

                            {/* Right side actions */}
                            <div className="flex items-center gap-4">
                                {/* Refresh */}
                                <RefreshButton onClick={handleRefresh} />

                                {/* Limit Dropdown */}
                                <SearchableSelect
                                    value={limitPerPage}
                                    onValueChange={setLimitPerPage}
                                    options={limitOptions}
                                    className="bg-[#252525] text-white w-20 h-11"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area with Sidebar and Content */}
                    {/* <div className="flex-1 flex overflow-hidden"> */}
                    <div className="flex-1 flex min-h-0 overflow-hidden">
                        {/* Filters Sidebar */}
                        <div className="w-80 bg-[#18191B] border-r border-[#252525] flex flex-col">
                            {/* Clip Count above Filters */}
                            {activeTab !== "highlights" && (<div className="px-6 py-4 text-center">
                                <span className="text-sm text-white">
                                    {selectedCount} of {totalClips} clips selected
                                </span>
                                <div className="flex justify-center gap-4 mt-2">
                                    <button
                                        onClick={handleSelectAll}
                                        className="text-sm text-white underline hover:text-gray-300"
                                    >
                                        {selectedClips.size === currentClips.length ? "Deselect all" : "Select all"}
                                    </button>
                                    <button
                                        onClick={handleClear}
                                        className="text-sm text-white underline hover:text-gray-300"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>)}

                            <ClipFilters page={page} activeTab={activeTab} />
                        </div>

                        {/* Content Area */}
                        {/* <div className="flex-1 flex flex-col overflow-hidden"> */}
                        {/* <div className="flex-1 flex flex-col min-h-screen overflow-auto"> */}
                        <div className="flex-1 flex flex-col min-h-0 overflow-auto">
                            {/* Action Buttons Bar */}
                            {activeTab !== "highlights" && (
                                <div className="bg-[#18191B] border-b border-[#252525] px-6 py-4">
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex flex-wrap items-center gap-5">
                                            <Button
                                                variant="outline"
                                                className="bg-[#252525] border-[#00BBFF] text-white hover:bg-[#00BBFF]/10 h-11 px-28 rounded-xl"
                                                disabled={selectedCount === 0}
                                            >
                                                <span className="text-xl font-bold text-white">+</span> Add to highlight
                                            </Button>
                                            <span className="text-white text-sm">or</span>
                                            <Button
                                                variant="outline"
                                                className="bg-[#252525] border-[#00BBFF] text-white hover:bg-[#00BBFF]/10 h-11 px-28 rounded-xl"
                                                disabled={selectedCount === 0}
                                            >
                                                <span className="text-xl font-bold text-white">+</span> Add to story
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-6 text-sm text-white flex-wrap justify-end">
                                            <div className="flex items-center gap-4">
                                                <span>
                                                    Total duration: <span className="font-bold">{totalDuration}</span>
                                                </span>

                                                {/* Pagination next to Total Duration */}
                                                <Pagination
                                                    currentPage={1}
                                                    totalPages={135}
                                                    onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                                    onNext={() => setCurrentPage((prev) => Math.min(prev + 1, 135))}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {/* Content */}
                            {/* <div className="flex-1 overflow-y-auto p-6"> */}
                            <div className="flex-1 overflow-y-auto p-6 min-h-0">
                                <Tabs value={activeTab} onValueChange={setActiveTab}>
                                    <TabsContent value="clips" className="mt-0">
                                        {loading ? (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {Array.from({ length: 8 }, (_, index) => (
                                                    <ShimmerCard key={index} variant="clip" />
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {currentClips.map((clip) => (
                                                    <ClipCard
                                                        key={clip.id}
                                                        clip={clip}
                                                        activeTab={activeTab}
                                                        page={page}
                                                        isSelected={selectedClips.has(clip.id)}
                                                        onSelect={handleClipSelect}
                                                        onClick={() =>
                                                            console.log("Clip clicked:", clip.id)
                                                        }
                                                        dropdownRef={dropdownRef}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </TabsContent>

                                    <TabsContent value="highlights" className="mt-0">
                                        {/* Sections */}
                                        <div className="space-y-12">
                                            {highlightSections.map(renderSection)}
                                        </div>
                                        {/* <div className="text-center text-white py-12">
                                            <h3 className="text-xl font-medium mb-2">
                                                No highlights yet
                                            </h3>
                                            <p className="text-gray-400">
                                                Select clips and add them to highlights to see them
                                                here.
                                            </p>
                                        </div> */}
                                    </TabsContent>

                                    <TabsContent value="web-stories" className="mt-0">
                                        <div className="text-center text-white py-12">
                                            <h3 className="text-xl font-medium mb-2">
                                                No web stories yet
                                            </h3>
                                            <p className="text-gray-400">
                                                Create web stories from your clips to see them here.
                                            </p>
                                        </div>
                                    </TabsContent>

                                    <TabsContent value="published" className="mt-0">
                                        <div className="text-center text-white py-12">
                                            <h3 className="text-xl font-medium mb-2">
                                                No published content
                                            </h3>
                                            <p className="text-gray-400">
                                                Published clips and content will appear here.
                                            </p>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
};

export default Clips;