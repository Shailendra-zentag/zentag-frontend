import React, { useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { SearchBar } from "./SearchBar";

interface EventOption {
    id: string;
    label: string;
}

interface EventsSectionProps {
    selectedEvents: string[];
    onEventChange: (eventId: string, checked: boolean) => void;
    eventOptions?: EventOption[];
}

const defaultEventOptions: EventOption[] = [
    { id: "all", label: "All" },
    { id: "goal", label: "Goal" },
    { id: "assist", label: "Assist" },
    { id: "shot-on-target", label: "Shot on target" },
    { id: "shot-off-target", label: "Shot off target" },
    { id: "save", label: "Save" },
    { id: "corner-kick", label: "Corner kick" },
    { id: "free-kick", label: "Free kick" },
    { id: "penalty-kick", label: "Penalty kick" },
    { id: "throw-in", label: "Throw in" },
    { id: "foul", label: "Foul" },
    { id: "yellow-card", label: "Yellow card" },
    { id: "red-card", label: "Red card" },
    { id: "offside", label: "Offside" },
    { id: "substitution", label: "Substitution" },
    { id: "var-review", label: "VAR review" },
    { id: "kick-off", label: "Kick off" },
    { id: "half-time", label: "Half time" },
    { id: "full-time", label: "Full time" },
];

export const EventsSection: React.FC<EventsSectionProps> = ({
    selectedEvents,
    onEventChange,
    eventOptions = defaultEventOptions,
}) => {
    const [eventsExpanded, setEventsExpanded] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    const filteredEvents = useMemo(() => {
        if (!searchQuery.trim()) return eventOptions;

        return eventOptions.filter((event) =>
            event.label.toLowerCase().includes(searchQuery.toLowerCase()),
        );
    }, [eventOptions, searchQuery]);

    return (
        <div className="mb-6">
            <div className="border border-[#252525] rounded-xl">
                <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-[#252525]/50 transition-colors"
                    onClick={() => setEventsExpanded(!eventsExpanded)}
                >
                    <h3 className="text-sm font-medium text-white">Events</h3>
                    <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform duration-200 ${eventsExpanded ? "rotate-180" : ""}`}
                    >
                        <path
                            d="M4.5 3.68205L1.38875 0.5L0.5 1.40897L4.5 5.5L8.5 1.40897L7.61125 0.5L4.5 3.68205Z"
                            fill="white"
                        />
                    </svg>
                </div>
                {eventsExpanded && (
                    <div className="px-4 pb-4 space-y-3">
                        {/* Search bar for events */}
                        <div className="mb-3">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                placeholder="Search events..."
                                className="h-9 text-sm"
                            />
                        </div>

                        {/* Events list */}
                        <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-600 hover:scrollbar-thumb-gray-500">
                            {filteredEvents.map((event) => (
                                <div key={event.id} className="flex items-center space-x-3">
                                    <Checkbox
                                        id={event.id}
                                        checked={
                                            selectedEvents.includes(event.id) ||
                                            (event.id === "all" && selectedEvents.includes("all"))
                                        }
                                        onCheckedChange={(checked: boolean) =>
                                            onEventChange(event.id, checked)
                                        }
                                        className="border-2 border-white data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#00BBFF] data-[state=checked]:to-[#0051FF] data-[state=checked]:border-[#00BBFF] rounded-md"
                                    />
                                    <Label
                                        htmlFor={event.id}
                                        className="text-sm font-medium text-white cursor-pointer"
                                    >
                                        {event.label}
                                    </Label>
                                </div>
                            ))}

                            {filteredEvents.length === 0 && (
                                <div className="text-sm text-gray-400 text-center py-2">
                                    No events found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
export default EventsSection;