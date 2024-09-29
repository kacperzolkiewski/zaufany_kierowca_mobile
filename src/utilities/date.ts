import { format } from "date-fns";
import pl from "date-fns/locale/pl";

export const formatDate = (date: Date) => {
  const formattedDate = format(date, "EEE dd MMMM yyyy", { locale: pl });
  const firstCharCapital = formattedDate[0].toUpperCase();

  return `${firstCharCapital}${formattedDate.slice(1)} r.`;
};
