import { DashboardData } from "@/lib/types/dashboard";

interface Props {
  data: DashboardData;
  currency: string;
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BalanceCards({ data, currency }: Props) {
  const isProjectedNegative = data.projectedBalance < 0;
  const isConfirmedNegative = data.confirmedBalance < 0;

  return (
    <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
      {/* Confirmed balance */}
      <div className="space-y-1 bg-card p-5 border rounded-xl">
        <p className="font-medium text-sm">Confirmed Balance</p>
        <p
          className={`text-3xl font-bold ${isConfirmedNegative ? "text-destructive" : "text-foreground"}`}>
          {fmt(data.confirmedBalance, currency)}
        </p>
        <p className="text-muted-foreground text-xs">
          Based on completed transactions only
        </p>
      </div>

      {/* Projected balance */}
      <div className="space-y-1 bg-card p-5 border rounded-xl">
        <p className="font-medium text-sm">Projected Balance</p>
        <p
          className={`text-3xl font-bold ${isProjectedNegative ? "text-destructive" : "text-primary"}`}>
          {fmt(data.projectedBalance, currency)}
        </p>
        <p className="text-muted-foreground text-xs">
          Includes pending transactions
        </p>
      </div>

      {/* Income breakdown */}
      <div className="space-y-3 bg-card p-5 border rounded-xl">
        <p className="font-medium text-sm">Income</p>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Confirmed</span>
          <span className="font-medium text-emerald-600">
            +{fmt(data.totalIncome, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Pending</span>
          <span className="font-medium text-emerald-400">
            +{fmt(data.pendingIncome, currency)}
          </span>
        </div>
      </div>

      {/* Expense breakdown */}
      <div className="space-y-3 bg-card p-5 border rounded-xl">
        <p className="font-medium text-sm">Expenses</p>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Confirmed</span>
          <span className="font-medium text-destructive">
            -{fmt(data.totalExpense, currency)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Pending</span>
          <span className="font-medium text-orange-400">
            -{fmt(data.pendingExpense, currency)}
          </span>
        </div>
      </div>
    </div>
  );
}
