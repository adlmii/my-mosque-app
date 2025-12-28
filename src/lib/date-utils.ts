import dayjs from "@/lib/dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

export function getCurrentMonthName() {
  return dayjs().format("MMMM YYYY");
}

export function getMonthDates() {
  const now = dayjs();
  const daysInMonth = now.daysInMonth();

  return Array.from({ length: daysInMonth }, (_, i) => {
    const date = dayjs().date(i + 1);
    
    return {
      dateObj: date,
      dateNum: date.format("DD"),
      dayName: date.format("dddd"),
      isToday: date.isSame(now, 'day')
    };
  });
}