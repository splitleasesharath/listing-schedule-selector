import { Day, Listing } from '../types';
import { sortDays } from './dayHelpers';

export const validateDaySelection = (
  day: Day,
  selectedDays: Day[],
  listing: Listing
): { isValid: boolean; error?: string } => {
  if (selectedDays.some(d => d.dayOfWeek === day.dayOfWeek)) {
    return { isValid: false, error: 'Day already selected' };
  }
  if (selectedDays.length >= 7) {
    return { isValid: false, error: 'Maximum 7 days can be selected' };
  }
  if (!listing.daysAvailable.includes(day.dayOfWeek)) {
    return { isValid: false, error: 'Day not available for this listing' };
  }
  if (!day.isAvailable) {
    return { isValid: false, error: 'This day is not available' };
  }
  const testSelection = sortDays([...selectedDays, day]);
  if (testSelection.length > 1 && !isContiguous(testSelection)) {
    return { isValid: false, error: 'Days must be consecutive' };
  }
  if (listing.maximumNights && selectedDays.length >= listing.maximumNights) {
    return { isValid: false, error: `Maximum ${listing.maximumNights} nights allowed` };
  }
  return { isValid: true };
};

export const validateDayRemoval = (
  day: Day,
  selectedDays: Day[],
  minimumNights: number
): { isValid: boolean; error?: string } => {
  const remainingDays = selectedDays.filter(d => d.dayOfWeek !== day.dayOfWeek);
  const remainingNights = remainingDays.length - 1;
  if (remainingNights < minimumNights) {
    return { isValid: false, error: `Minimum ${minimumNights} nights required` };
  }
  if (remainingDays.length > 1 && !isContiguous(remainingDays)) {
    return { isValid: false, error: 'Removal would create non-consecutive selection' };
  }
  return { isValid: true };
};

export const isContiguous = (days: Day[]): boolean => {
  if (days.length <= 1) return true;
  const sorted = sortDays(days);
  const dayNumbers = sorted.map(d => d.dayOfWeek);
  let normallyContiguous = true;
  for (let i = 0; i < dayNumbers.length - 1; i++) {
    if (dayNumbers[i + 1] - dayNumbers[i] !== 1) {
      normallyContiguous = false;
      break;
    }
  }
  if (normallyContiguous) return true;
  if (dayNumbers.includes(0) && dayNumbers.includes(6)) {
    const sundayIndex = dayNumbers.indexOf(0);
    if (sundayIndex === 0) {
      const remainingDays = dayNumbers.slice(1);
      if (remainingDays[remainingDays.length - 1] === 6) {
        for (let i = 0; i < remainingDays.length - 1; i++) {
          if (remainingDays[i + 1] - remainingDays[i] !== 1) {
            return false;
          }
        }
        return true;
      }
    }
  }
  return false;
};
