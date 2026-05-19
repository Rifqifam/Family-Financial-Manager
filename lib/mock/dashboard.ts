import {
  DashboardData,
  Transaction,
  TransactionWithBalance,
} from "@/lib/types/dashboard";

export const mockTransactions: Transaction[] = [
  {
    id: "1",
    label: "Monthly salary",
    amount: 15000000,
    type: "INCOME",
    status: "DONE",
    due_date: "2026-05-01",
    created_at: "2026-05-01T00:00:00Z",
  },
  {
    id: "2",
    label: "Rent",
    amount: 1200000,
    type: "EXPENSE",
    status: "DONE",
    due_date: "2026-05-02",
    created_at: "2026-05-02T00:00:00Z",
  },
  {
    id: "3",
    label: "Groceries",
    amount: 300000,
    type: "EXPENSE",
    status: "DONE",
    due_date: "2026-05-05",
    created_at: "2026-05-05T00:00:00Z",
  },
  {
    id: "4",
    label: "Freelance project",
    amount: 5000000,
    type: "INCOME",
    status: "PENDING",
    due_date: "2026-05-25",
    created_at: "2026-05-06T00:00:00Z",
  },
  {
    id: "5",
    label: "Netflix",
    amount: 100000,
    type: "EXPENSE",
    status: "PENDING",
    due_date: "2026-05-28",
    created_at: "2026-05-06T00:00:00Z",
  },
  {
    id: "6",
    label: "Electricity bill",
    amount: 150000,
    type: "EXPENSE",
    status: "PENDING",
    due_date: "2026-05-30",
    created_at: "2026-05-06T00:00:00Z",
  },
];

export const mockWishlist = [
  {
    id: "w1",
    name: "MacBook Pro",
    price: 2500,
    target_date: "2026-09-01",
    status: "ACTIVE" as const,
  },
  {
    id: "w2",
    name: "Family vacation",
    price: 1500,
    target_date: "2026-12-01",
    status: "ACTIVE" as const,
  },
];

export const mockSurplusTrend = [
  { month: "Dec", surplus: 800 },
  { month: "Jan", surplus: 1200 },
  { month: "Feb", surplus: 600 },
  { month: "Mar", surplus: -200 },
  { month: "Apr", surplus: 950 },
  { month: "May", surplus: 1465 },
];

export function computeBiggestExpense(transactions: Transaction[]) {
  return (
    transactions
      .filter((t) => t.type === "EXPENSE" && t.status === "DONE")
      .sort((a, b) => b.amount - a.amount)[0] ?? null
  );
}

export function computeUpcoming(transactions: Transaction[]) {
  const today = new Date();
  return transactions
    .filter((t) => t.status === "PENDING" && t.due_date)
    .sort(
      (a, b) =>
        new Date(a.due_date!).getTime() - new Date(b.due_date!).getTime(),
    )
    .slice(0, 3);
}

export function computeDashboardData(
  transactions: Transaction[],
): DashboardData {
  const doneIncome = transactions.filter(
    (t) => t.type === "INCOME" && t.status === "DONE",
  );
  const doneExpense = transactions.filter(
    (t) => t.type === "EXPENSE" && t.status === "DONE",
  );
  const pendingIncome = transactions.filter(
    (t) => t.type === "INCOME" && t.status === "PENDING",
  );
  const pendingExpense = transactions.filter(
    (t) => t.type === "EXPENSE" && t.status === "PENDING",
  );

  const totalIncome = doneIncome.reduce((s, t) => s + t.amount, 0);
  const totalExpense = doneExpense.reduce((s, t) => s + t.amount, 0);
  const pendingIncomeTotal = pendingIncome.reduce((s, t) => s + t.amount, 0);
  const pendingExpenseTotal = pendingExpense.reduce((s, t) => s + t.amount, 0);

  return {
    confirmedBalance: totalIncome - totalExpense,
    projectedBalance:
      totalIncome + pendingIncomeTotal - (totalExpense + pendingExpenseTotal),
    totalIncome,
    totalExpense,
    pendingIncome: pendingIncomeTotal,
    pendingExpense: pendingExpenseTotal,
    recentTransactions: transactions.slice(0, 5),
  };
}

export function computeRunningBalance(
  transactions: Transaction[],
): TransactionWithBalance[] {
  // sort oldest → newest using due_date if available, fallback to created_at
  const sorted = [...transactions].sort((a, b) => {
    const dateA = new Date(a.due_date ?? a.created_at).getTime();
    const dateB = new Date(b.due_date ?? b.created_at).getTime();
    return dateA - dateB;
  });

  let balance = 0;
  const withBalance: TransactionWithBalance[] = sorted.map((tx) => {
    if (tx.type === "INCOME") {
      balance += tx.amount;
    } else {
      balance -= tx.amount;
    }
    return { ...tx, runningBalance: balance };
  });

  // reverse to display newest → oldest
  return withBalance.reverse();
}
