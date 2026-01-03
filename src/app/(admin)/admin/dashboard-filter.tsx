"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

export function DashboardFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const handleFilter = (val: string) => {
    const params = new URLSearchParams(searchParams);
    if (val === "all") params.delete("filter");
    else params.set("filter", val);
    router.replace(`/admin?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex bg-muted/50 p-1 rounded-lg border border-border/50">
      {["all", "insidental", "rutin"].map((filter) => (
        <button
          key={filter}
          onClick={() => handleFilter(filter)}
          className={cn(
            "px-3 py-1 text-xs font-semibold rounded-md transition-all capitalize",
            currentFilter === filter 
              ? "bg-white text-primary shadow-sm border border-border/50" 
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          )}
        >
          {filter === "all" ? "Semua" : filter === "insidental" ? "Event" : "Rutin"}
        </button>
      ))}
    </div>
  );
}