"use client";

import { useState, useEffect } from "react";
import dayjs from "@/lib/dayjs";

export function useCurrentTime() {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(dayjs());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return now;
}