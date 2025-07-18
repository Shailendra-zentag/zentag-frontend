import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SortOption {
  value: string;
  label: string;
}

interface SortBySectionProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  sortOptions?: SortOption[];
}

const defaultSortOptions: SortOption[] = [
  { value: "time-desc", label: "Time Sequence (Descending)" },
  { value: "time-asc", label: "Time Sequence (Ascending)" },
  { value: "recent", label: "Recent" },
];

export const SortBySection: React.FC<SortBySectionProps> = ({
  sortBy,
  onSortChange,
  sortOptions = defaultSortOptions,
}) => {
  return (
    <div className="mb-6">
      <h3 className="text-xs font-bold text-white mb-3">Sort By</h3>
      <RadioGroup
        value={sortBy}
        onValueChange={onSortChange}
        className="space-y-3"
      >
        {sortOptions.map((option) => (
          <div key={option.value} className="flex items-center space-x-3">
            <RadioGroupItem
              value={option.value}
              id={option.value}
              className="border-2 border-white data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#00BBFF] data-[state=checked]:to-[#0051FF] data-[state=checked]:border-[#00BBFF]"
            />
            <Label
              htmlFor={option.value}
              className="text-sm font-medium text-white cursor-pointer"
            >
              {option.label}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};
export default SortBySection;