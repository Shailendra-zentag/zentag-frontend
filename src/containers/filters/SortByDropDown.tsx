import React, { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
} from "@/components/ui/select"; // adjust the import path if needed

const SORT_LABELS: Record<string, string> = {
    latest: "Latest",
    oldest: "Oldest",
    rating: "Rating",
    duration: "Duration",
};

const SortDropdown = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("latest");

    return (
        <Select
            value={value}
            onValueChange={setValue}
            open={open}
            onOpenChange={setOpen}
        >
            <SelectTrigger className="[&>svg.h-4.w-4.opacity-50]:hidden bg-[#252525] border-none text-white w-64 h-11 rounded-xl [appearance:none]">
                <div className="flex items-center w-full justify-between">
                    <span className="mr-2">
                        Sort by: {SORT_LABELS[value] || "Latest"}
                    </span>
                    <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                    >
                        <path
                            d="M4.5 3.68205L1.38875 0.5L0.5 1.40897L4.5 5.5L8.5 1.40897L7.61125 0.5L4.5 3.68205Z"
                            fill="white"
                        />
                    </svg>
                </div>
            </SelectTrigger>
            <SelectContent className="bg-[#252525] border-[#373737] text-white">
                <SelectItem value="latest">Sort by: Latest</SelectItem>
                <SelectItem value="oldest">Sort by: Oldest</SelectItem>
                <SelectItem value="rating">Sort by: Rating</SelectItem>
                <SelectItem value="duration">Sort by: Duration</SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SortDropdown;
