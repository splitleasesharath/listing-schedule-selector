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

  // Check for normal contiguity (no week wrap)
  let normallyContiguous = true;
  for (let i = 0; i < dayNumbers.length - 1; i++) {
    if (dayNumbers[i + 1] - dayNumbers[i] !== 1) {
      normallyContiguous = false;
      break;
    }
  }
  if (normallyContiguous) return true;

  // Check for week wrap-around (e.g., Thu-Fri-Sat-Sun-Mon or Sat-Sun-Mon)
  // This happens when we have Sunday (0) and the days wrap around the week boundary
  if (dayNumbers.includes(0)) {
    // Split into two groups: days starting from Sunday and days before Sunday
    const sundayIndex = dayNumbers.indexOf(0);
    const daysFromSunday = dayNumbers.slice(0, sundayIndex + 1); // [0, 1, 2, ...]
    const daysBeforeSunday = dayNumbers.slice(sundayIndex + 1); // [4, 5, 6, ...]

    // For wrap-around to be valid:
    // 1. Days from Sunday should be contiguous starting from 0
    // 2. Days before Sunday should be contiguous ending at 6
    // 3. The last day before Sunday should be 6 (Saturday)

    if (daysBeforeSunday.length > 0) {
      // Check if daysFromSunday are contiguous from 0
      let contiguousFromSunday = true;
      for (let i = 0; i < daysFromSunday.length; i++) {
        if (daysFromSunday[i] !== i) {
          contiguousFromSunday = false;
          break;
        }
      }

      // Check if daysBeforeSunday are contiguous
      let contiguousBeforeSunday = true;
      for (let i = 0; i < daysBeforeSunday.length - 1; i++) {
        if (daysBeforeSunday[i + 1] - daysBeforeSunday[i] !== 1) {
          contiguousBeforeSunday = false;
          break;
        }
      }

      // Check if it ends with Saturday (6)
      const endsWithSaturday = daysBeforeSunday[daysBeforeSunday.length - 1] === 6;

      return contiguousFromSunday && contiguousBeforeSunday && endsWithSaturday;
    }
  }

  return false;
};
