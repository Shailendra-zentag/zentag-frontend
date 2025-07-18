import React, { useState } from "react";
// import { DateRangeSelector } from "@/components/ui/date-range-selector";
import { SearchBar } from "../../containers/filters/SearchBar";
import { EventsSection } from "../../containers/filters/EventsSection";
import { AspectRatioSection } from "../../containers/filters/AspectRatioSection";
import { StatusSection } from "../../containers/filters/StatusSection";
import { RatingSection } from "../../containers/filters/RatingSection";
import { SortBySection } from "../../containers/filters/SortBySection";
// import { Dayjs } from "dayjs";

interface ClipFiltersProps {
  onFilterChange?: (filters: any) => void;
}

const ClipFilters: React.FC<ClipFiltersProps> = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedAspectRatios, setSelectedAspectRatios] = useState<string[]>(
    [],
  );
  const [selectedStatus, setSelectedStatus] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("time-desc");
  //  const [dateRange, setDateRange] = useState<
  //     [Dayjs | null, Dayjs | null] | null
  //   >(null);

  const handleEventChange = (eventId: string, checked: boolean) => {
    let newSelection: string[];

    if (eventId === "all") {
      newSelection = checked ? ["all"] : [];
    } else {
      newSelection = checked
        ? [...selectedEvents.filter((id) => id !== "all"), eventId]
        : selectedEvents.filter((id) => id !== eventId);
    }

    setSelectedEvents(newSelection);
  };

  const handleAspectRatioChange = (aspectRatioId: string, checked: boolean) => {
    let newSelection: string[];

    if (aspectRatioId === "all") {
      newSelection = checked ? ["all"] : [];
    } else {
      newSelection = checked
        ? [...selectedAspectRatios.filter((id) => id !== "all"), aspectRatioId]
        : selectedAspectRatios.filter((id) => id !== aspectRatioId);
    }

    setSelectedAspectRatios(newSelection);
  };

  const handleStatusChange = (statusId: string, checked: boolean) => {
    let newSelection: string[];

    if (statusId === "all") {
      newSelection = checked ? ["all"] : [];
    } else {
      newSelection = checked
        ? [...selectedStatus.filter((id) => id !== "all"), statusId]
        : selectedStatus.filter((id) => id !== statusId);
    }

    setSelectedStatus(newSelection);
  };

  const handleRatingChange = (ratingId: string, checked: boolean) => {
    let newSelection: string[];

    if (ratingId === "all") {
      newSelection = checked ? ["all"] : [];
    } else {
      newSelection = checked
        ? [...selectedRatings.filter((id) => id !== "all"), ratingId]
        : selectedRatings.filter((id) => id !== ratingId);
    }

    setSelectedRatings(newSelection);
  };

  return (
    <div className="w-80 h-full bg-[#18191B] border-r border-[#252525] p-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
      <h2 className="text-lg font-bold text-white text-center mb-6">Filters</h2>

      {/* Main Search */}
      <div className="mb-6">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search..."
        />
      </div>

      {/* Events Section with integrated search */}
      <EventsSection
        selectedEvents={selectedEvents}
        onEventChange={handleEventChange}
      />

      {/* Aspect Ratio Section */}
      <AspectRatioSection
        selectedAspectRatios={selectedAspectRatios}
        onAspectRatioChange={handleAspectRatioChange}
      />

      {/* Status Section */}
      <StatusSection
        selectedStatus={selectedStatus}
        onStatusChange={handleStatusChange}
      />

      {/* Rating Section */}
      <RatingSection
        selectedRatings={selectedRatings}
        onRatingChange={handleRatingChange}
      />

      {/* Date Range */}
      {/* <div className="mb-6">
        <h3 className="text-xs font-bold text-white mb-3">Date Range</h3>
        <DateRangeSelector
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select date range"
        />
      </div> */}

      {/* Sort By Section */}
      <SortBySection sortBy={sortBy} onSortChange={setSortBy} />
    </div>
  );
};

export default ClipFilters;
