"use client";
import { useState } from "react";
import Heading from "./components/Heading";
import { formatNumber } from "@/utils/formatNumber";

type SummaryDataType = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Summary = () => {
  const [summaryData, setSummaryData] = useState<SummaryDataType>({
    sale: {
      label: "Total Sale",
      digit: 0,
    },
    products: {
      label: "Total Product",
      digit: 0,
    },
    orders: {
      label: "Total Orders",
      digit: 0,
    },
    paidOrders: {
      label: "Paid Orders",
      digit: 0,
    },
    unpaidOrders: {
      label: "Unpaid Orders",
      digit: 20,
    },
    users: {
      label: "Total Users",
      digit: 10,
    },
  });
  const SummaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="m-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto">
        {SummaryKeys &&
          SummaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {formatNumber(summaryData[key].digit)}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
