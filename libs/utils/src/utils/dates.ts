import { format, formatDistanceToNow } from 'date-fns';

export const formatDateTimeFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }

  return format(new Date(Number(seconds) * 1000), 'h:mm aaa MMMM do y');
};

export const formatShortDateTimeFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }

  return format(new Date(Number(seconds) * 1000), 'MMMM do, p');
};

export const formatDateFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }

  return format(new Date(Number(seconds) * 1000), 'M / dd / yy');
};

export const formatLongDateFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }

  return format(new Date(Number(seconds) * 1000), 'MMMM dd, yyyy');
};

export const formatDistanceToNowFromSeconds = (
  seconds: string | undefined
): string | undefined => {
  if (!seconds) {
    return;
  }

  return formatDistanceToNow(new Date(Number(seconds) * 1000), {
    addSuffix: true,
  });
};
