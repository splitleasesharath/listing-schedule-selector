import { Day, Night, DayOfWeek } from '../types';
import { sortDays, getNextDay, createNight } from './dayHelpers';

export const calculateNightsFromDays = (days: Day[]): Night[] => {
  if (days.length < 2) return [];

  const sorted = sortDays(days);
  const dayNumbers = sorted.map(d => d.dayOfWeek);

  // Check for wrap-around: both Sunday (0) and Saturday (6) are selected
  const hasSunday = dayNumbers.includes(0);
  const hasSaturday = dayNumbers.includes(6);

  if (hasSunday && hasSaturday && days.length > 1 && days.length < 7) {
    // This is a wrap-around schedule
    // Find the gap to determine the correct sequence
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    const notSelected = allDays.filter(d => !dayNumbers.includes(d));

    if (notSelected.length > 0) {
      const lastGapDay = Math.max(...notSelected);

      // Reorder days: start from day after gap ends, wrap around
      const reordered: Day[] = [];
      for (let i = lastGapDay + 1; i < lastGapDay + 1 + days.length; i++) {
        const dayNum = (i % 7) as DayOfWeek;
        const day = sorted.find(d => d.dayOfWeek === dayNum);
        if (day) reordered.push(day);
      }

      // Create nights from reordered days (all except last day)
      const nights: Night[] = [];
      for (let i = 0; i < reordered.length - 1; i++) {
        nights.push(createNight(reordered[i].dayOfWeek));
      }
      return nights;
    }
  }

  // Normal case: create nights from sorted days
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
  const dayNumbers = sorted.map(d => d.dayOfWeek);

  // Check for wrap-around: both Sunday (0) and Saturday (6) are selected
  const hasSunday = dayNumbers.includes(0);
  const hasSaturday = dayNumbers.includes(6);

  if (hasSunday && hasSaturday && days.length > 1 && days.length < 7) {
    // This is a wrap-around schedule
    // Find the gap in the days (the NOT selected days)
    const allDays = [0, 1, 2, 3, 4, 5, 6];
    const notSelected = allDays.filter(d => !dayNumbers.includes(d));

    if (notSelected.length > 0) {
      // Check-in is the day after the last not-selected day
      // Check-out is the day before the first not-selected day
      const lastGapDay = Math.max(...notSelected);
      const firstGapDay = Math.min(...notSelected);

      // Check-in is day after the gap ends
      const checkInDayNum = ((lastGapDay + 1) % 7) as DayOfWeek;
      const checkIn = sorted.find(d => d.dayOfWeek === checkInDayNum) || sorted[0];

      // Check-out is day before the gap starts (wrapping backwards)
      const checkOutDayNum = ((firstGapDay - 1 + 7) % 7) as DayOfWeek;
      const checkOut = sorted.find(d => d.dayOfWeek === checkOutDayNum) || sorted[sorted.length - 1];

      return { checkIn, checkOut };
    }
  }

  // Normal case (no wrap-around): first sorted day is check-in, last is check-out
  const checkIn = sorted[0];
  const checkOut = sorted[sorted.length - 1];
  return { checkIn, checkOut };
};

export const countSelectedNights = (days: Day[]): number => {
  return Math.max(0, days.length - 1);
};
