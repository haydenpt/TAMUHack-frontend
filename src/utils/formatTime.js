import { format, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy p");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd MMM yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
