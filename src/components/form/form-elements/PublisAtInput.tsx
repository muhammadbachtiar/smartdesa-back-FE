import React from 'react';
import Flatpickr from "react-flatpickr";
import { CalenderIcon } from "../../../icons"
import moment from "moment";

interface PublishedAtInputProps {
  publishedAtData: string | null | undefined,
  setValue: (field: string, value: string) => void;
}

const PublishedAtInput: React.FC<PublishedAtInputProps> = ({ publishedAtData, setValue }) => {
  const publishedAt = new Date(publishedAtData || "");

  return (
    <>
       <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Published At</label>
        <div className="relative w-full flatpickr-wrapper">
          <Flatpickr
            value={publishedAt}
            onChange={(selectedDates) => {
              if (selectedDates.length > 0) {
                const selectedDate = moment(selectedDates[0]); 
                const currentTime = moment(); 
                const combinedDateTime = selectedDate
                    .set({
                    hour: currentTime.hour(),
                    minute: currentTime.minute(),
                    second: currentTime.second(),
                    millisecond: currentTime.millisecond(),
                    }) 
                    .toISOString();
                setValue("published_at", combinedDateTime);
              }
            }}
            options={{
              dateFormat: "d/m/Y",
              minDate: new Date(new Date().setDate(new Date().getDate() - 1)),
            }}
            placeholder="Select an option"
            className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700  dark:focus:border-brand-800"
          />
          <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
            <CalenderIcon className="size-6" />
          </span>
        </div>
    </>
  );
};

export default PublishedAtInput;