interface Props {
  totalIncome: number;
  totalExpense: number;
}

export function SavingsRate({ totalIncome, totalExpense }: Props) {
  const rate =
    totalIncome > 0
      ? Math.max(
          0,
          Math.round(((totalIncome - totalExpense) / totalIncome) * 100),
        )
      : 0;

  const color =
    rate >= 20
      ? "text-emerald-500"
      : rate >= 10
        ? "text-orange-400"
        : "text-destructive";

  const barColor =
    rate >= 20
      ? "bg-emerald-500"
      : rate >= 10
        ? "bg-orange-400"
        : "bg-destructive";

  return (
    <div className="space-y-3 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Savings Rate</p>
      <p className={`text-xl font-bold ${color}`}>{rate}%</p>
      <div className="bg-muted rounded-full w-full h-1.5">
        <div
          className={`h-1.5 rounded-full transition-all ${barColor}`}
          style={{ width: `${Math.min(rate, 100)}%` }}
        />
      </div>
      <p className="text-muted-foreground text-xs">
        {rate >= 20
          ? "Great saving pace"
          : rate >= 10
            ? "Room to improve"
            : "Spending exceeds income"}
      </p>
    </div>
  );
}
