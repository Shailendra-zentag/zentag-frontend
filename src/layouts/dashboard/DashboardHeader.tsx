import { sportOptions as sports } from "@/constants/AddVideo";
import { DateRangeSelector } from "../../components/ui/date-range-selector";
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, X } from "lucide-react";
import { Dayjs } from "dayjs";
// import SVGIcon from "../../components/ui/svg-icon";
// import { SVG_PATHS } from "../utils/assets";
// import sportSelectorIcon from "../../src/assets/components/Header/sportSelectorIcon.svg";

interface DashboardHeaderProps {
  title: string;
  onAddVideoFeed?: () => void;
}
// console.log(sportSelectorIcon);
const SportSelectorIcon = () => (

  <svg
    width="12"
    height="12"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M0 1.28572C0 0.575635 0.575634 0 1.28571 0H4.04762C4.7577 0 5.33333 0.575634 5.33333 1.28571V4.04762C5.33333 4.7577 4.7577 5.33333 4.04762 5.33333H1.28572C0.575635 5.33333 0 4.7577 0 4.04762V1.28572ZM0 7.95238C0 7.2423 0.575634 6.66667 1.28571 6.66667H4.04762C4.7577 6.66667 5.33333 7.2423 5.33333 7.95238V10.7143C5.33333 11.4244 4.7577 12 4.04762 12H1.28572C0.575635 12 0 11.4244 0 10.7143V7.95238ZM6.66667 1.28572C6.66667 0.575635 7.2423 0 7.95238 0H10.7143C11.4244 0 12 0.575634 12 1.28571V4.04762C12 4.7577 11.4244 5.33333 10.7143 5.33333H7.95238C7.2423 5.33333 6.66667 4.7577 6.66667 4.04762V1.28572ZM6.66667 7.95238C6.66667 7.2423 7.2423 6.66667 7.95238 6.66667H10.7143C11.4244 6.66667 12 7.2423 12 7.95238V10.7143C12 11.4244 11.4244 12 10.7143 12H7.95238C7.2423 12 6.66667 11.4244 6.66667 10.7143V7.95238Z"
      fill="url(#paint0_linear_2032_536)"
    />
    <defs>
      <linearGradient
        id="paint0_linear_2032_536"
        x1="16.38"
        y1="6.07118"
        x2="3.92925"
        y2="-2.05927"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00BBFF" />
        <stop offset="1" stopColor="#0051FF" />
      </linearGradient>
    </defs>
  </svg>
  // <SVGIcon
  //   src={"src/assets/components/Header/sportSelectorIcon.svg"}
  //   className="w-5 h-5"
  //   alt="Info"
  // />
  // sportSelectorIcon
);

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onAddVideoFeed,
}) => {
  const [showSportDropdown, setShowSportDropdown] = useState(false);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<
    [Dayjs | null, Dayjs | null] | null
  >(null);

  const sportDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sportDropdownRef.current &&
        !sportDropdownRef.current.contains(event.target as Node)
      ) {
        setShowSportDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const addSport = (sport: string) => {
    if (!selectedSports.includes(sport)) {
      setSelectedSports([...selectedSports, sport]);
    }
  };

  const removeSport = (sport: string) => {
    setSelectedSports(selectedSports.filter((s) => s !== sport));
  };

  const handleDateRangeChange = (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => {
    setDateRange(dates);
    console.log("Date range selected:", dateStrings);
  };

  return (
    <header className="h-16 bg-[#18191B] px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Sport Selector */}
        <div className="relative" ref={sportDropdownRef}>
          <div
            className="flex items-center gap-4 px-4 py-2 bg-[#252525] rounded-lg border border-[#0BF] min-w-80 cursor-pointer"
            onClick={() => setShowSportDropdown(!showSportDropdown)}
          >
            <SportSelectorIcon />
            <span className="text-white text-sm">Sport selector</span>
            <ChevronDown
              className={`w-4 h-4 text-white ml-auto transition-transform ${showSportDropdown ? "rotate-180" : ""}`}
            />
          </div>

          {showSportDropdown && (
            <div className="absolute top-full mt-2 w-80 bg-[#2A2B2E] border border-gray-700 rounded-lg shadow-lg z-50">
              <div className="p-4">
                {sports.map((sport) => (
                  <div
                    key={sport.value}
                    className="flex items-center justify-between p-2 hover:bg-[#3A3B3E] rounded cursor-pointer"
                    onClick={() => addSport(sport.value)}
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-gradient-to-r from-[#00BBFF] to-[#0051FF] rounded"></div>
                      <span className="text-white text-sm">{sport.label}</span>
                    </div>
                    {/* <span className="text-gray-400 text-sm">{sport.count}</span> */}
                  </div>
                ))}
                {/* <div className="mt-2 pt-2 border-t border-gray-600">
                  <button className="w-full text-left p-2 text-blue-400 hover:bg-[#3A3B3E] rounded text-sm">
                    + Add
                  </button>
                </div> */}
              </div>
            </div>
          )}
        </div>

        {/* Selected sport chips on the right */}
        {selectedSports.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedSports.map((sport) => (
              <div
                key={sport}
                className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-md"
              >
                <span>{sport}</span>
                <button
                  onClick={() => removeSport(sport)}
                  className="hover:bg-blue-700 rounded"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative w-72">
          <Input
            placeholder="Search..."
            className="bg-[#252525] border-none text-white placeholder-gray-400 focus:border-blue-500 h-10 rounded-lg"
          />
        </div>

        {/* Date Range Selector */}
        <div className="w-80">
          <DateRangeSelector
            placeholder={["Start date", "End date"]}
            value={dateRange}
            onChange={handleDateRangeChange}
            format="YYYY-MM-DD"
            allowClear={true}
            className="w-full"
          />
        </div>

        <Button
          className="bg-gradient-to-r from-[#00BBFF] to-[#0051FF] hover:from-[#0099CC] hover:to-[#003DCC] h-10 rounded-lg"
          onClick={onAddVideoFeed}
        >
          + Add video feed
        </Button>

        {/* <Button
          variant="ghost"
          size="sm"
          className="p-2 h-9 w-9 hover:bg-[#2A2B2E]"
        >
          <User className="w-5 h-5" />
        </Button> */}
      </div>
    </header>
  );
};

export default DashboardHeader;
