import { TransactionWithBalance } from "@/lib/types/dashboard";
import { formatDistanceToNow } from "date-fns";

interface Props {
  transactions: TransactionWithBalance[];
  currency: string;
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function TransactionList({ transactions, currency }: Props) {
  if (transactions.length === 0) {
    return (
      <div className="bg-card p-5 border rounded-xl">
        <p className="mb-4 font-medium">Transactions</p>
        <p className="py-8 text-muted-foreground text-sm text-center">
          No transactions yet this month.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 bg-card p-5 border rounded-xl">
      <p className="font-medium">Transactions</p>

      {/* column headers */}
      <div className="gap-x-6 grid grid-cols-[1fr_auto_auto] px-1">
        <span className="text-muted-foreground text-xs">Description</span>
        <span className="text-muted-foreground text-xs text-right">Amount</span>
        <span className="text-muted-foreground text-xs text-right">
          Balance after
        </span>
      </div>

      <div className="space-y-1">
        {transactions.map((tx) => (
          <div
            key={tx.id}
            className={`grid grid-cols-[1fr_auto_auto] gap-x-6 items-center py-3 px-1 rounded-lg border-b last:border-0 ${
              tx.status === "PENDING" ? "opacity-60" : ""
            }`}>
            {/* left — label + meta */}
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-2 h-2 rounded-full shrink-0 ${
                  tx.status === "DONE" ? "bg-emerald-500" : "bg-orange-400"
                }`}
              />
              <div className="min-w-0">
                <p className="font-medium text-sm truncate">{tx.label}</p>
                <p className="text-muted-foreground text-xs">
                  {tx.due_date &&
                    `  ${formatDistanceToNow(new Date(tx.due_date), {
                      addSuffix: true,
                    })} · ${new Date(tx.due_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}`}
                </p>
              </div>
            </div>

            {/* middle — transaction amount */}
            <span
              className={`text-sm font-semibold tabular-nums text-right ${
                tx.type === "INCOME" ? "text-emerald-600" : "text-destructive"
              }`}>
              {tx.type === "INCOME" ? "+" : "-"}
              {fmt(tx.amount, currency)}
            </span>

            {/* right — running balance */}
            <span
              className={`text-sm tabular-nums text-right ${
                tx.runningBalance < 0
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}>
              {fmt(tx.runningBalance, currency)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
