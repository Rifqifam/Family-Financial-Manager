"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { DashboardData } from "@/lib/types/dashboard";

interface Props {
  data: DashboardData;
  currency: string;
}

export function IncomeExpenseChart({ data, currency }: Props) {
  const chartData = [
    { name: "Confirmed", Income: data.totalIncome, Expense: data.totalExpense },
    {
      name: "Pending",
      Income: data.pendingIncome,
      Expense: data.pendingExpense,
    },
  ];

  return (
    <div className="space-y-2 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Income vs Expenses</p>
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData} barCategoryGap="35%" barSize={16}>
          <XAxis dataKey="name" tick={{ fontSize: 11 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) =>
              new Intl.NumberFormat("en-US", { notation: "compact" }).format(v)
            }
          />
          <Tooltip
            formatter={(value) => {
              const numericValue =
                typeof value === "number" ? value : Number(value ?? 0);

              return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency,
              }).format(numericValue);
            }}
          />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="Income" fill="#10b981" radius={[3, 3, 0, 0]} />
          <Bar dataKey="Expense" fill="#f43f5e" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
