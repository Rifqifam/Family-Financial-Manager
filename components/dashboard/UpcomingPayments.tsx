import { Transaction } from "@/lib/types/dashboard";

interface Props {
  transactions: Transaction[];
  currency: string;
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function daysUntil(date: string) {
  const diff = new Date(date).getTime() - new Date().getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export function UpcomingPayments({ transactions, currency }: Props) {
  return (
    <div className="space-y-3 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Upcoming payments</p>
      {transactions.length === 0 ? (
        <p className="text-muted-foreground text-sm">No upcoming payments</p>
      ) : (
        <div className="space-y-2">
          {transactions.map((tx) => {
            const days = daysUntil(tx.due_date!);
            const urgent = days <= 3;
            return (
              <div key={tx.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">{tx.label}</p>
                  <p
                    className={`text-xs ${urgent ? "text-destructive" : "text-muted-foreground"}`}>
                    {days === 0
                      ? "Due today"
                      : days < 0
                        ? "Overdue"
                        : `in ${days} days · ${new Date(tx.due_date!).toLocaleDateString("en-US", { month: "short", day: "numeric" })}`}
                  </p>
                </div>
                <span className="font-semibold text-destructive text-sm">
                  -{fmt(tx.amount, currency)}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
