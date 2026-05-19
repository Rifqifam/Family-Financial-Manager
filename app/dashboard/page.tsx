"use client";

import { useState } from "react";
import { MonthNavigator } from "@/components/dashboard/MonthNavigator";
import { BalanceCards } from "@/components/dashboard/BalanceCards";
import { IncomeExpenseChart } from "@/components/dashboard/IncomeExpenseChart";
import { TransactionList } from "@/components/dashboard/TransactionList";
import { BiggestExpense } from "@/components/dashboard/BiggestExpense";
import { SavingsRate } from "@/components/dashboard/SavingsRate";
import { UpcomingPayments } from "@/components/dashboard/UpcomingPayments";
import { SurplusTrend } from "@/components/dashboard/SurplusTrend";
import { WishlistProgress } from "@/components/dashboard/WishlistProgress";
import {
  mockTransactions,
  mockWishlist,
  mockSurplusTrend,
  computeDashboardData,
  computeRunningBalance,
  computeBiggestExpense,
  computeUpcoming,
} from "@/lib/mock/dashboard";

const CURRENCY = "IDR";

export default function DashboardPage() {
  const [month, setMonth] = useState(new Date());

  const data = computeDashboardData(mockTransactions);
  const transactionsWithBalance = computeRunningBalance(mockTransactions);
  const biggestExpense = computeBiggestExpense(mockTransactions);
  const upcoming = computeUpcoming(mockTransactions);
  const monthlySurplus = data.totalIncome - data.totalExpense;

  return (
    <main className="space-y-6 px-6 py-8 w-full">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <MonthNavigator month={month} onChange={setMonth} />
      </div>

      {/* Row 1 — balance cards (2 col) */}
      <BalanceCards data={data} currency={CURRENCY} />

      {/* Row 2 — 4 small stat cards */}
      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        <div className="space-y-1 bg-card p-4 border rounded-xl">
          <p className="font-medium text-sm">Confirmed Income</p>
          <p className="font-bold text-emerald-500 text-xl">
            +
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: CURRENCY,
              maximumFractionDigits: 0,
            }).format(data.totalIncome)}
          </p>
        </div>
        <div className="space-y-1 bg-card p-4 border rounded-xl">
          <p className="font-medium text-sm">Confirmed Expense</p>
          <p className="font-bold text-destructive text-xl">
            -
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: CURRENCY,
              maximumFractionDigits: 0,
            }).format(data.totalExpense)}
          </p>
        </div>
        <BiggestExpense transaction={biggestExpense} currency={CURRENCY} />
        <SavingsRate
          totalIncome={data.totalIncome}
          totalExpense={data.totalExpense}
        />
      </div>

      {/* Row 3 — upcoming payments + compact chart */}
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        <UpcomingPayments transactions={upcoming} currency={CURRENCY} />
        <IncomeExpenseChart data={data} currency={CURRENCY} />
      </div>

      {/* Row 4 — surplus trend + wishlist side by side */}
      <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
        <SurplusTrend data={mockSurplusTrend} currency={CURRENCY} />
        <WishlistProgress
          items={mockWishlist}
          monthlySurplus={monthlySurplus}
          currency={CURRENCY}
        />
      </div>

      {/* Row 5 — full width transaction list */}
      <TransactionList
        transactions={transactionsWithBalance}
        currency={CURRENCY}
      />
    </main>
  );
}
