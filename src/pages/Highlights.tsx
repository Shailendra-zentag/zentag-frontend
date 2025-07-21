import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "@/layouts/dashboard/Sidebar";
import ClipCard from "@/layouts/clipsPage/ClipCard";
import ClipFilters from "@/layouts/clipsPage/ClipFilters";
import ShimmerCard from "@/layouts/clipsPage/ClipShimmerCard";
import { SearchBar } from "@/containers/filters/SearchBar";
import { Button } from "@/components/ui/button";

import { ClipData } from "@/mocks/clips_mockData/mockClips";
import { mockMyHighlightsData } from "@/mocks/clips_mockData/mockMyHighlights";
import RefreshButton from "@/containers/filters/RefreshButton";
import { SearchableSelect } from "@/components/ui/searchable-select";
import { limitOptions } from "@/constants/Filter";
import Pagination from "@/containers/filters/Pagination";

interface MyHighlightsProps {
    page: string;
}

// Sport icons
const SportIcons = {
    Soccer: () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <rect width="19.5" height="19.5" rx="4.87499" fill="white"/>
  <path d="M10.5714 4.41447C10.4295 5.07978 9.77652 5.50331 9.1107 5.36271C8.44626 5.2221 8.01964 4.5688 8.16093 3.90178C8.30291 3.23648 8.95655 2.81125 9.62305 2.95185C10.2889 3.09417 10.7141 3.74917 10.5714 4.41447Z" fill="#18191B"/>
  <path d="M6.72503 15.7967C6.72503 16.3077 6.30904 16.7227 5.79857 16.7227C5.28896 16.7227 4.87436 16.3077 4.87436 15.7967C4.87436 15.2892 5.28896 14.8725 5.79857 14.8725C6.30904 14.8725 6.72503 15.2892 6.72503 15.7967Z" fill="#18191B"/>
  <path d="M14.529 6.03485C14.4587 5.9594 14.3624 5.92167 14.2658 5.92167H14.2651C14.2651 5.92167 11.3382 6.20804 10.4273 5.90968C10.2089 5.85824 9.93021 5.77594 9.66358 5.65419C9.66238 5.65934 9.66169 5.66791 9.66169 5.67477C9.66169 5.67477 9.66032 5.67305 9.66032 5.67134C9.65689 5.66791 9.65638 5.66447 9.655 5.66104C9.60339 5.61817 9.54783 5.57703 9.48816 5.54102C9.44324 5.52044 9.38442 5.493 9.32201 5.46899C9.31069 5.46385 9.29801 5.45871 9.28463 5.45357C9.26783 5.44671 9.25171 5.44157 9.2349 5.43642C9.21827 5.42956 9.20147 5.42271 9.18483 5.41756C9.17798 5.41585 9.16666 5.41413 9.1586 5.4107C9.13991 5.40555 9.12105 5.40213 9.10374 5.39699C9.08487 5.39356 9.06755 5.39012 9.04749 5.38669C9.03943 5.38498 9.02794 5.38154 9.02056 5.38154C9.00393 5.37983 8.98576 5.37982 8.96913 5.37811C8.94958 5.37639 8.93295 5.3747 8.91409 5.3747C8.90208 5.3747 8.88871 5.37298 8.87602 5.37298C8.80829 5.37127 8.7433 5.37126 8.69443 5.37126C8.52228 5.38498 8.37636 5.43641 8.25513 5.50671C8.25238 5.50671 8.25032 5.50671 8.24844 5.50843C7.88801 5.65932 7.74998 5.75193 7.26044 6.1686C6.56719 6.74988 6.14314 7.42889 6.06615 8.32568C6.01985 8.77836 6.13714 9.91692 6.13714 9.91692C6.14588 9.96151 6.1632 10.0044 6.18943 10.0472C6.29729 10.2119 6.51969 10.2616 6.68841 10.1518C6.79953 10.0781 6.85645 9.95465 6.84976 9.82947L6.85113 9.82776C6.78426 9.00642 6.60662 8.63603 6.93292 7.7804C7.09771 7.47518 7.2925 7.24714 7.51301 7.05852C7.10508 8.95669 6.1632 13.396 6.16663 13.396C6.15925 13.4235 6.15651 13.4526 6.15651 13.4835C6.15651 13.7218 6.34822 13.9122 6.5845 13.9122C6.76334 13.9122 6.91612 13.8007 6.98111 13.6447L6.98385 13.6344C6.9938 13.6087 7.00117 13.5829 7.00391 13.5572L7.55039 11.5682C7.57662 11.5527 7.67436 11.4979 7.80159 11.5253C7.92813 11.5527 7.99586 11.6419 8.01267 11.6676L7.18532 16.2047C7.13577 16.4345 7.28392 16.6625 7.51352 16.7105C7.74603 16.762 7.97306 16.6128 8.02261 16.383C8.02467 16.371 8.02467 16.3607 8.02741 16.3505C8.02741 16.3505 10.0388 6.85619 10.0574 6.71901C11.6979 6.97622 14.0575 6.67099 14.2873 6.64184C14.3684 6.63669 14.4481 6.60413 14.5103 6.54583C14.5733 6.48924 14.6076 6.41552 14.6216 6.33835C14.6216 6.33492 14.6221 6.3229 14.6221 6.31947C14.6336 6.22002 14.6048 6.11373 14.529 6.03485Z" fill="#18191B"/>
</svg>
    ),
    Cricket: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.83333 0V1.95833H11.1667V0H7.83333ZM0 7.83333V11.1667H1.95833V7.83333H0ZM17.0417 7.83333V11.1667H19V7.83333H17.0417ZM7.83333 17.0417V19H11.1667V17.0417H7.83333ZM13.5208 2.91667L12.3125 4.125L14.875 6.6875L16.0833 5.47917L13.5208 2.91667ZM2.91667 5.47917L4.125 6.6875L6.6875 4.125L5.47917 2.91667L2.91667 5.47917ZM14.875 12.3125L12.3125 14.875L13.5208 16.0833L16.0833 13.5208L14.875 12.3125ZM6.6875 14.875L4.125 12.3125L2.91667 13.5208L5.47917 16.0833L6.6875 14.875ZM9.5 4.75C6.85 4.75 4.75 6.85 4.75 9.5C4.75 12.15 6.85 14.25 9.5 14.25C12.15 14.25 14.25 12.15 14.25 9.5C14.25 6.85 12.15 4.75 9.5 4.75Z" fill="white" />
        </svg>
    ),
    Basketball: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0ZM16.625 9.5C16.625 11.0724 16.1513 12.5329 15.3355 13.7566L10.7434 9.16447V1.58553C13.8947 1.98684 16.625 4.48026 16.625 9.5ZM8.25658 1.58553V9.16447L3.66447 13.7566C2.84868 12.5329 2.375 11.0724 2.375 9.5C2.375 4.48026 5.10526 1.98684 8.25658 1.58553ZM9.5 17.4145C7.92763 17.4145 6.46711 16.9408 5.24342 16.125L9.83553 11.5329H17.4145C17.0132 14.6842 14.5197 17.4145 9.5 17.4145ZM17.4145 9.16447H9.83553L5.24342 4.57237C6.46711 3.75658 7.92763 3.28289 9.5 3.28289C14.5197 3.28289 17.0132 6.01316 17.4145 9.16447Z" fill="white" />
        </svg>
    ),
    Hockey: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8333 3.16667C15.8333 4.64583 14.6458 5.83333 13.1667 5.83333C11.6875 5.83333 10.5 4.64583 10.5 3.16667C10.5 1.6875 11.6875 0.5 13.1667 0.5C14.6458 0.5 15.8333 1.6875 15.8333 3.16667ZM18.5 15.8333H15.8333V12.6667L13.1667 9.5H11.9583L9.29167 12.6667V15.8333H6.625V12.6667L10.0208 8.70833L11.4292 7.29167C11.6667 7.05417 11.9583 6.9375 12.25 6.9375C12.5417 6.9375 12.8333 7.05417 13.0708 7.29167L16.4667 11.2708C16.7042 11.5083 16.8208 11.8 16.8208 12.0917V15.8333H18.5ZM0.5 18.5H18.5V16.8333H0.5V18.5Z" fill="white" />
        </svg>
    ),
    Tennis: () => (
        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.5 0C4.25329 0 0 4.25329 0 9.5C0 14.7467 4.25329 19 9.5 19C14.7467 19 19 14.7467 19 9.5C19 4.25329 14.7467 0 9.5 0ZM9.5 1.58553C13.5592 1.58553 16.9145 4.50329 17.3158 8.25658H9.5V1.58553ZM1.68421 9.5C1.68421 5.44079 4.60197 2.08553 8.35526 1.68421V9.5H1.68421ZM9.5 17.4145C5.44079 17.4145 2.08553 14.4967 1.68421 10.7434H9.5V17.4145ZM10.7434 17.3158V9.5H17.3158C16.9145 13.2533 14.2237 16.625 10.7434 17.3158Z" fill="white" />
        </svg>
    ),
};

const MyHighlights: React.FC<MyHighlightsProps> = ({ page }) => {
    const navigate = useNavigate();
    const [highlights, setHighlights] = useState<ClipData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeSport, setActiveSport] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [limitPerPage, setLimitPerPage] = useState("20");
    const [currentPage, setCurrentPage] = useState(1);
    const [showMoreSports, setShowMoreSports] = useState(false);
    const moreDropdownRef = useRef<HTMLDivElement>(null);

    const sports = ["All", "Soccer", "Cricket", "Basketball", "Hockey", "Tennis"];
    const moreSports = [
        { name: "Football", icon: SportIcons.Soccer },
        { name: "Baseball", icon: SportIcons.Basketball },
        { name: "Golf", icon: SportIcons.Tennis },
        { name: "Swimming", icon: SportIcons.Hockey },
        { name: "Boxing", icon: SportIcons.Cricket },
        { name: "Athletics", icon: SportIcons.Soccer }
    ];

    useEffect(() => {
        // Simulate loading highlights
        const timer = setTimeout(() => {
            setHighlights(mockMyHighlightsData);
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                moreDropdownRef.current &&
                !moreDropdownRef.current.contains(event.target as Node)
            ) {
                setShowMoreSports(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClipSelect = (clipId: string, selected: boolean) => {
        console.log("Clip selected:", clipId, selected);
    };

    const handleCreateHighlight = () => {
        console.log("Create highlight clicked");
    };

    // Filter and pagination logic
    const filteredHighlights = highlights.filter((highlight) => {
        const matchesSport = activeSport === "All" ||
            highlight.tags.some(tag => tag.toLowerCase().includes(activeSport.toLowerCase())) ||
            highlight.event.toLowerCase().includes(activeSport.toLowerCase()) ||
            highlight.title.toLowerCase().includes(activeSport.toLowerCase());
        const matchesSearch = highlight.title.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSport && matchesSearch;
    });

    const totalHighlights = filteredHighlights.length;
    const itemsPerPage = parseInt(limitPerPage);
    const totalPages = Math.ceil(totalHighlights / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentHighlights = filteredHighlights.slice(startIndex, endIndex);

    const handleRefresh = () => {
        console.log("Refreshed!");
    };

    return (
        <div className="h-screen flex h-screen bg-[#18191B] text-white flex overflow-x-auto overflow-y-auto">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-h-screen overflow-auto">
                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6">
                    <h1 className="text-[28px] font-medium text-white">Highlights</h1>
                    <Button
                        onClick={handleCreateHighlight}
                        className="bg-gradient-to-r from-[#00BBFF] to-[#0051FF] text-white h-11 px-6 rounded-xl hover:opacity-90 transition-opacity"
                    >
                        Create highlight
                    </Button>
                </div>

                {/* Sport Tabs */}
                <div className="px-8 border-b border-[#252525]">
                    <div className="flex items-center justify-between mb-4">
                        {/* Sport Navigation */}
                        <div className="flex items-center gap-8">
                            {sports.map((sport) => (
                                <button
                                    key={sport}
                                    onClick={() => {
                                        setActiveSport(sport);
                                        setCurrentPage(1);
                                    }}
                                    className={`flex items-center gap-2 pb-4 transition-colors relative ${activeSport === sport
                                        ? "text-white font-bold"
                                        : "text-white font-medium hover:text-gray-300"
                                        }`}
                                >
                                    {activeSport === sport && (
                                        <div
                                            className="absolute bottom-0 left-0 right-0 h-1"
                                            style={{
                                                background: "linear-gradient(315deg, #0EF -21.71%, #0051FF 118.09%)",
                                            }}
                                        />
                                    )}
                                    {sport !== "All" && SportIcons[sport as keyof typeof SportIcons] && (
                                        <div className="w-5 h-5">
                                            {SportIcons[sport as keyof typeof SportIcons]()}
                                        </div>
                                    )}
                                    <span className="text-lg">{sport}</span>
                                </button>
                            ))}
                            <div className="relative" ref={moreDropdownRef}>
                                <button
                                    onClick={() => setShowMoreSports(!showMoreSports)}
                                    className="flex items-center gap-2 pb-4 border-b-2 border-transparent text-white font-medium hover:text-gray-300"
                                >
                                    <span className="text-lg">More</span>
                                    <svg
                                        width="5"
                                        height="8"
                                        viewBox="0 0 8 5"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="rotate-[-90deg]"
                                    >
                                        <path
                                            d="M4 3.18205L0.888749 3.87709e-08L-3.9812e-08 0.908974L4 5L8 0.908974L7.11125 3.10222e-07L4 3.18205Z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                </button>

                                {showMoreSports && (
                                    <div className="absolute top-full left-0 mt-2 bg-[#252525] border border-[#373737] rounded-xl shadow-lg z-50 w-64">
                                        <div className="p-4">
                                            {moreSports.map((sport, index) => (
                                                <button
                                                    key={index}
                                                    onClick={() => {
                                                        setActiveSport(sport.name);
                                                        setShowMoreSports(false);
                                                        setCurrentPage(1);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-3 py-3 text-white hover:bg-[#434343] rounded transition-colors"
                                                >
                                                    <div className="w-5 h-5">
                                                        <sport.icon />
                                                    </div>
                                                    <span className="text-lg">{sport.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right Side Controls */}
                        <div className="flex items-center gap-4">
                            {/* Refresh Button */}
                            <RefreshButton onClick={handleRefresh} />

                            {/* Search Bar */}
                            <div className="w-[275px]">
                                <SearchBar
                                    value={searchQuery}
                                    onChange={setSearchQuery}
                                    placeholder="Search..."
                                    className="bg-[#252525] border-none text-white placeholder-gray-400 rounded-xl h-11"
                                />
                            </div>

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

                {/* Main content with filters and grid */}
                <div className="flex-1 flex min-h-0 overflow-hidden">
                    {/* Filters */}
                    <div className="w-80 bg-[#18191B] border-r border-[#252525] flex flex-col">
                        <ClipFilters page="my-highlights" />
                    </div>
                    {/* Content Area */}
                    <div className="flex-1 flex flex-col">
                        {/* Highlights Count and Sort */}
                        <div className="px-8 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-white">
                                {totalHighlights.toLocaleString()} highlights
                            </h2>
                            {/* Pagination */}
                            <Pagination
                                currentPage={1}
                                totalPages={135}
                                onPrevious={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                onNext={() => setCurrentPage((prev) => Math.min(prev + 1, 135))}
                            />
                        </div>
                        {/* Content Grid */}
                        <div className="flex-1 px-8 pb-8 overflow-y-auto">
                            {loading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {Array.from({ length: 8 }).map((_, index) => (
                                        <ShimmerCard key={index} />
                                    ))}
                                </div>
                            ) : currentHighlights.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {currentHighlights.map((highlight) => (
                                        <ClipCard
                                            key={highlight.id}
                                            clip={highlight}
                                            page={page}
                                            onSelect={handleClipSelect}
                                            onClick={() => console.log("Highlight clicked:", highlight.id)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <h3 className="text-xl font-medium text-white mb-2">
                                            No highlights found
                                        </h3>
                                        <p className="text-gray-400">
                                            Try adjusting your search or sport filter.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyHighlights;
