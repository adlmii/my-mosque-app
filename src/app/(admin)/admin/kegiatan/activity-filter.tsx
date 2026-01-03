"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function ActivityFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentFilter = searchParams.get("filter") || "all";

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    router.push(`/admin/kegiatan?${params.toString()}`);
  };

  return (
    <Tabs defaultValue={currentFilter} onValueChange={handleFilterChange}>
      <TabsList className="grid w-[300px] grid-cols-3">
        <TabsTrigger value="all">Semua</TabsTrigger>
        <TabsTrigger value="rutin">Rutin</TabsTrigger>
        <TabsTrigger value="insidental">Event</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}