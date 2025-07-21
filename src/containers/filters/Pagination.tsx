import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Previous Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onPrevious}
        className="w-10 h-10 border border-[#252525] rounded-lg hover:bg-[#252525]"
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4 text-white" />
      </Button>

      {/* Current Page */}
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 bg-[#252525] border border-white rounded-lg"
      >
        <span className="text-white text-sm">{currentPage}</span>
      </Button>

      {/* Dots */}
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 bg-[#252525] rounded-lg hover:bg-[#3A3B3E]"
        disabled
      >
        <span className="text-white text-sm">...</span>
      </Button>

      {/* Last Page */}
      <Button
        variant="ghost"
        size="sm"
        className="w-10 h-10 bg-[#252525] rounded-lg hover:bg-[#3A3B3E]"
      >
        <span className="text-white text-sm">{totalPages}</span>
      </Button>

      {/* Next Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onNext}
        className="w-10 h-10 border border-[#252525] rounded-lg hover:bg-[#252525]"
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="w-4 h-4 text-white" />
      </Button>
    </div>
  );
};

export default Pagination;
