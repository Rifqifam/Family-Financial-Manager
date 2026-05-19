interface WishlistItem {
  id: string;
  name: string;
  price: number;
  target_date: string;
}

interface Props {
  items: WishlistItem[];
  monthlySurplus: number;
  currency: string;
}

function fmt(amount: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function WishlistProgress({ items, monthlySurplus, currency }: Props) {
  return (
    <div className="space-y-3 bg-card p-4 border rounded-xl">
      <p className="font-medium text-sm">Wishlist</p>
      {items.length === 0 ? (
        <p className="text-muted-foreground text-sm">No wishlist items yet</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => {
            const monthsNeeded =
              monthlySurplus > 0
                ? Math.ceil(item.price / monthlySurplus)
                : null;
            const monthsUntil = Math.ceil(
              (new Date(item.target_date).getTime() - new Date().getTime()) /
                (1000 * 60 * 60 * 24 * 30),
            );
            const canAfford =
              monthsNeeded !== null && monthsNeeded <= monthsUntil;
            const progress =
              monthsNeeded !== null
                ? Math.min(100, Math.round((monthsUntil / monthsNeeded) * 100))
                : 0;

            return (
              <div key={item.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-sm">{item.name}</p>
                  <span className="font-semibold text-sm">
                    {fmt(item.price, currency)}
                  </span>
                </div>
                <div className="bg-muted rounded-full w-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full transition-all ${canAfford ? "bg-emerald-500" : "bg-orange-400"}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-muted-foreground text-xs">
                  {monthsNeeded === null
                    ? "Add income to calculate"
                    : canAfford
                      ? `On track · ${monthsNeeded} month${monthsNeeded !== 1 ? "s" : ""} to save`
                      : `Need ${monthsNeeded} months · target is ${monthsUntil} months away`}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
