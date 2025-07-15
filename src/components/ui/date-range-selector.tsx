import { DatePicker } from "antd";
import { Dayjs } from "dayjs";
import React, { useCallback } from "react";
import { cn } from "../lib/utils";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";

const { RangePicker } = DatePicker;

// Import Ant Design styles
import "antd/dist/reset.css";

interface DateRangeSelectorProps {
  label?: string;
  placeholder?: [string, string];
  value?: [Dayjs | null, Dayjs | null] | null;
  defaultValue?: [Dayjs | null, Dayjs | null] | null;
  disabled?: boolean;
  required?: boolean;
  className?: string;
  rangePickerClassName?: string;
  labelClassName?: string;
  format?: string;
  error?: string;
  allowClear?: boolean;
  showTime?: boolean;
  onChange?: (
    dates: [Dayjs | null, Dayjs | null] | null,
    dateStrings: [string, string],
  ) => void;
}

export function DateRangeSelector({
  label,
  placeholder = ["Start date", "End date"],
  value,
  defaultValue,
  disabled = false,
  required = false,
  className = "",
  rangePickerClassName = "",
  labelClassName = "",
  format = "YYYY-MM-DD",
  error,
  allowClear = true,
  showTime = false,
  onChange,
  ...props
}: DateRangeSelectorProps) {
  const handleChange = useCallback(
    (
      dates: [Dayjs | null, Dayjs | null] | null,
      dateStrings: [string, string],
    ) => {
      if (onChange) {
        onChange(dates, dateStrings);
      }
    },
    [onChange],
  );

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label
          className={cn(
            "text-white text-sm font-medium",
            required && "after:content-['*'] after:text-red-500 after:ml-1",
            labelClassName,
          )}
        >
          {label}
        </Label>
      )}

      <div className="relative">
        <RangePicker
          value={value}
          defaultValue={defaultValue ?? undefined}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          format={format}
          allowClear={allowClear}
          showTime={showTime}
          className={cn(
            "w-full bg-[#252525] border border-[#252525] text-white rounded-lg h-[42px]",
            "hover:bg-[#373737] transition-colors",
            "[&_.ant-picker-input]:bg-transparent [&_.ant-picker-input]:text-white",
            "[&_.ant-picker-suffix]:text-white [&_.ant-picker-clear]:text-white",
            "[&_.ant-picker-separator]:text-white",
            disabled && "opacity-50 cursor-not-allowed",
            error && "border-red-500",
            rangePickerClassName,
          )}
          popupClassName="dark-date-range-picker"
          suffixIcon={<Calendar className="w-4 h-4 text-white" />}
          {...props}
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}

      <style>{`
        .dark-date-range-picker .ant-picker-dropdown {
          background: #2a2a2a !important;
          border: 1px solid #373737 !important;
          border-radius: 8px !important;
        }

        .dark-date-range-picker .ant-picker-panel-container {
          background: #2a2a2a !important;
        }

        .dark-date-range-picker .ant-picker-panels {
          background: #2a2a2a !important;
        }

        .dark-date-range-picker .ant-picker-panel {
          background: #2a2a2a !important;
          border: none !important;
        }

        .dark-date-range-picker .ant-picker-header {
          border-bottom: 1px solid #373737 !important;
        }

        .dark-date-range-picker .ant-picker-header-view button {
          color: white !important;
        }

        .dark-date-range-picker .ant-picker-prev-icon,
        .dark-date-range-picker .ant-picker-next-icon,
        .dark-date-range-picker .ant-picker-super-prev-icon,
        .dark-date-range-picker .ant-picker-super-next-icon {
          color: white !important;
        }

        .dark-date-range-picker .ant-picker-content th {
          color: #9ca3af !important;
        }

        .dark-date-range-picker .ant-picker-cell {
          color: white !important;
        }

        .dark-date-range-picker .ant-picker-cell:hover .ant-picker-cell-inner {
          background: #373737 !important;
        }

        .dark-date-range-picker
          .ant-picker-cell-selected
          .ant-picker-cell-inner {
          background: #00bbff !important;
          color: white !important;
        }

        .dark-date-range-picker .ant-picker-cell-today .ant-picker-cell-inner {
          border-color: #00bbff !important;
        }

        .dark-date-range-picker
          .ant-picker-cell-in-view.ant-picker-cell-range-start
          .ant-picker-cell-inner,
        .dark-date-range-picker
          .ant-picker-cell-in-view.ant-picker-cell-range-end
          .ant-picker-cell-inner {
          background: #00bbff !important;
        }

        .dark-date-range-picker
          .ant-picker-cell-in-view.ant-picker-cell-in-range
          .ant-picker-cell-inner {
          background: rgba(0, 187, 255, 0.2) !important;
        }

        .dark-date-range-picker
          .ant-picker-cell-disabled
          .ant-picker-cell-inner {
          color: #6b7280 !important;
        }

        .dark-date-range-picker .ant-picker-footer {
          border-top: 1px solid #373737 !important;
          background: #2a2a2a !important;
        }

        .dark-date-range-picker .ant-picker-footer a {
          color: #00bbff !important;
        }

        .dark-date-range-picker .ant-picker-footer a:hover {
          color: #0099cc !important;
        }

        .dark-date-range-picker .ant-picker-ranges {
          background: #2a2a2a !important;
        }

        .dark-date-range-picker .ant-picker-ranges .ant-picker-preset {
          color: white !important;
        }

        .dark-date-range-picker .ant-picker-ranges .ant-picker-preset:hover {
          background: #373737 !important;
        }

        /* Style the input field */
        .ant-picker.ant-picker-range {
          background: #252525 !important;
          border-color: #252525 !important;
          color: white !important;
        }

        .ant-picker.ant-picker-range:hover {
          background: #373737 !important;
          border-color: #373737 !important;
        }

        .ant-picker.ant-picker-range.ant-picker-focused {
          border-color: #00bbff !important;
          box-shadow: 0 0 0 2px rgba(0, 187, 255, 0.2) !important;
        }

        .ant-picker.ant-picker-range .ant-picker-input input {
          background: transparent !important;
          color: white !important;
        }

        .ant-picker.ant-picker-range .ant-picker-input input::placeholder {
          color: #9ca3af !important;
        }

        .ant-picker.ant-picker-range .ant-picker-active-bar {
          background: #00bbff !important;
        }

        .ant-picker.ant-picker-range .ant-picker-range-separator {
          color: white !important;
        }

        .ant-picker.ant-picker-range .ant-picker-suffix {
          color: white !important;
        }

        .ant-picker.ant-picker-range .ant-picker-clear {
          background: #373737 !important;
          color: white !important;
        }

        .ant-picker.ant-picker-range.ant-picker-disabled {
          background: #1f1f1f !important;
          border-color: #2a2a2a !important;
          color: #6b7280 !important;
        }

        /* Input field styling */
        .ant-picker-input input {
          font-size: 14px !important;
          font-weight: 400 !important;
        }

        /* Panel divider */
        .dark-date-range-picker
          .ant-picker-panel-container
          .ant-picker-panel:first-child {
          border-right: 1px solid #373737 !important;
        }
      `}</style>
    </div>
  );
}