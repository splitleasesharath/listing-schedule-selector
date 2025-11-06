import { Day, Night } from '../types';
import { sortDays, getNextDay, createNight } from './dayHelpers';

export const calculateNightsFromDays = (days: Day[]): Night[] => {
  if (days.length < 2) return [];
  const sorted = sortDays(days);
  const nights: Night[] = [];
  for (let i = 0; i < sorted.length - 1; i++) {
    nights.push(createNight(sorted[i].dayOfWeek));
  }
  return nights;
};

export const calculateCheckInCheckOut = (days: Day[]): {
  checkIn: Day | null;
  checkOut: Day | null;
} => {
  if (days.length === 0) {
    return { checkIn: null, checkOut: null };
  }
  const sorted = sortDays(days);
  const checkIn = sorted[0];
  const lastDay = sorted[sorted.length - 1];
  const checkOut = getNextDay(lastDay);
  return { checkIn, checkOut };
};

export const countSelectedNights = (days: Day[]): number => {
  return Math.max(0, days.length - 1);
};
