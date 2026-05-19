"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface DataPoint {
  month: string;
  surplus: number;
}
interface Props {
  data: DataPoint[];
  currency: string;
}

export function SurplusTrend({ data, currency }: Props) {
  return (
    <div className="space-y-2 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Monthly surplus trend</p>
      <ResponsiveContainer width="100%" height={120}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="surplusGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
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
          <ReferenceLine y={0} stroke="#f43f5e" strokeDasharray="3 3" />
          <Area
            type="monotone"
            dataKey="surplus"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#surplusGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
