"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  month: Date;
  onChange: (date: Date) => void;
}

export function MonthNavigator({ month, onChange }: Props) {
  const label = month.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function prev() {
    const d = new Date(month);
    d.setMonth(d.getMonth() - 1);
    onChange(d);
  }

  function next() {
    const d = new Date(month);
    d.setMonth(d.getMonth() + 1);
    onChange(d);
  }

  const isCurrentMonth =
    month.getMonth() === new Date().getMonth() &&
    month.getFullYear() === new Date().getFullYear();

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="icon" onClick={prev}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <span className="w-36 font-medium text-base text-center">{label}</span>
      <Button
        variant="outline"
        size="icon"
        onClick={next}
        disabled={isCurrentMonth}>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
