import {
  formatDistanceToNowStrict,
  hoursToSeconds,
  minutesToSeconds,
} from 'date-fns';
import { isNumberish } from './typeguards';

export const conversionFns = {
  days: (amt: number) => hoursToSeconds(amt * 24),
  hours: (amt: number) => hoursToSeconds(amt),
  minutes: (amt: number) => minutesToSeconds(amt),
  seconds: (amt: number) => amt,
};

export const toSeconds = (amt: number, unit: keyof typeof conversionFns) =>
  conversionFns[unit]?.(amt);

export const unixTimeInSeconds = () => {
  return Math.floor(Date.now() / 1000);
};

export const calcExpiry = (duration: number) => {
  return duration > 0 ? unixTimeInSeconds() + duration : 0;
};

export const formatPeriods = (duration: string) => {
  if (duration) {
    let s = Number(duration);
    const d = Math.floor(s / (3600 * 24));
    s -= d * 3600 * 24;
    const h = Math.floor(s / 3600);
    s -= h * 3600;
    const m = Math.floor(s / 60);
    s -= m * 60;
    const tmp = [];
    d && tmp.push(`${d} day${d > 1 ? 's' : ''}`);
    (d || h) && h && tmp.push(`${h} hour${h > 1 ? 's' : ''}`);
    (d || h || m) && m && tmp.push(`${m} minute${m > 1 ? 's' : ''}`);
    s && tmp.push(`${s} second${s > 1 ? 's' : ''}`);

    return tmp.join(' ');
  }
  return 0;
};

export const baalTimeToNow = (time: string | number) => {
  if (!isNumberish(time)) {
    console.warn(
      'baalTimeToNow: time is not a number or numberish string',
      time
    );
    return;
  }
  return formatDistanceToNowStrict(new Date(Number(time) * 1000));
};
