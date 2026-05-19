import { Transaction } from "@/lib/types/dashboard";

interface Props {
  transaction: Transaction | null;
  currency: string;
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function BiggestExpense({ transaction, currency }: Props) {
  return (
    <div className="space-y-1 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Biggest Expense</p>
      {transaction ? (
        <>
          <p className="font-bold text-destructive text-xl">
            {fmt(transaction.amount, currency)}
          </p>
          <p className="text-muted-foreground text-xs truncate">
            {transaction.label}
          </p>
        </>
      ) : (
        <p className="text-muted-foreground text-sm">No expenses yet</p>
      )}
    </div>
  );
}
