export type TransactionType = "INCOME" | "EXPENSE";
export type TransactionStatus = "DONE" | "PENDING";

export interface Transaction {
  id: string;
  label: string;
  amount: number;
  type: TransactionType;
  status: TransactionStatus;
  due_date: string | null;
  created_at: string;
}

export interface TransactionWithBalance extends Transaction {
  runningBalance: number;
}

export interface DashboardData {
  confirmedBalance: number;
  projectedBalance: number;
  totalIncome: number;
  totalExpense: number;
  pendingIncome: number;
  pendingExpense: number;
  recentTransactions: Transaction[];
}
