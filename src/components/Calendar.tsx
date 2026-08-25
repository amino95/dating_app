"use client";

import { DayPicker, type DayPickerProps, type DayButtonProps } from "react-day-picker";
import "react-day-picker/style.css";

// `day` and the library-provided `className` are intentionally dropped: `day` isn't a
// valid DOM attribute, and the visual state below fully replaces the default className.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function CustomDayButton({ day, modifiers, className, ...props }: DayButtonProps) {
  const stateClasses = modifiers.selected
    ? "bg-gradient-to-r from-pink-500 to-orange-400 font-semibold text-white shadow-md shadow-pink-200 hover:from-pink-500 hover:to-orange-400"
    : modifiers.disabled
      ? "text-gray-300 opacity-50"
      : modifiers.outside
        ? "text-gray-300 hover:bg-pink-50"
        : modifiers.today
          ? "border-2 border-pink-300 text-gray-700 hover:bg-pink-50"
          : "text-gray-700 hover:bg-pink-50";

  return (
    <button
      {...props}
      className={`flex size-9 items-center justify-center rounded-full text-sm transition ${stateClasses}`}
    />
  );
}

export function Calendar(props: DayPickerProps) {
  return (
    <DayPicker
      showOutsideDays
      className="w-fit"
      classNames={{
        months: "flex flex-col",
        month: "space-y-2",
        month_caption: "relative flex h-9 items-center justify-center",
        caption_label: "font-display text-sm font-semibold text-gray-900",
        nav: "absolute inset-x-0 top-0 flex h-9 items-center justify-between px-1",
        button_previous:
          "flex size-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-30 disabled:hover:bg-transparent",
        button_next:
          "flex size-7 items-center justify-center rounded-full text-gray-400 transition hover:bg-pink-50 hover:text-pink-600 disabled:opacity-30 disabled:hover:bg-transparent",
        chevron: "size-4 fill-current",
        month_grid: "mt-2 w-full border-collapse",
        weekdays: "flex",
        weekday: "w-9 text-center text-xs font-medium text-gray-400",
        week: "mt-1 flex",
        day: "size-9 p-0 text-center",
        hidden: "invisible",
      }}
      components={{ DayButton: CustomDayButton }}
      {...props}
    />
  );
}
