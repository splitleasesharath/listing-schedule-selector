import { Day, Listing, DayOfWeek } from '../types';
import { sortDays } from './dayHelpers';

// Validate if a day can be selected
export const validateDaySelection = (
  day: Day,
  selectedDays: Day[],
  listing: Listing
): { isValid: boolean; error?: string } => {
  // Check if already selected
  if (selectedDays.some(d => d.dayOfWeek === day.dayOfWeek)) {
    return { isValid: false, error: 'Day already selected' };
  }

  // Check maximum (7 days max)
  if (selectedDays.length >= 7) {
    return { isValid: false, error: 'Maximum 7 days can be selected' };
  }

  // Check if day is in listing's available days
  if (!listing.daysAvailable.includes(day.dayOfWeek)) {
    return { isValid: false, error: 'Day not available for this listing' };
  }

  // Check if day is marked as available
  if (!day.isAvailable) {
    return { isValid: false, error: 'This day is not available' };
  }

  // Check contiguity after adding
  const testSelection = sortDays([...selectedDays, day]);
  if (testSelection.length > 1 && !isContiguous(testSelection)) {
    return { isValid: false, error: 'Days must be consecutive' };
  }

  // Check maximum nights constraint
  if (listing.maximumNights && selectedDays.length >= listing.maximumNights) {
    return {
      isValid: false,
      error: `Maximum ${listing.maximumNights} nights allowed`
    };
  }

  return { isValid: true };
};

// Validate if a day can be removed
export const validateDayRemoval = (
  day: Day,
  selectedDays: Day[],
  minimumNights: number
): { isValid: boolean; error?: string } => {
  const remainingDays = selectedDays.filter(d => d.dayOfWeek !== day.dayOfWeek);

  // Check minimum nights (nights = days - 1)
  const remainingNights = remainingDays.length - 1;
  if (remainingNights < minimumNights) {
    return {
      isValid: false,
      error: `Minimum ${minimumNights} nights required`
    };
  }

  // Check contiguity after removal
  if (remainingDays.length > 1 && !isContiguous(remainingDays)) {
    return {
      isValid: false,
      error: 'Removal would create non-consecutive selection'
    };
  }

  return { isValid: true };
};

// Check if days are contiguous (consecutive)
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

  // Check for week wrap (Saturday to Sunday)
  // If selection includes both Saturday (6) and Sunday (0), check if it wraps properly
  if (dayNumbers.includes(0) && dayNumbers.includes(6)) {
    // Check if days form a contiguous sequence wrapping around the week
    // For example: Fri(5), Sat(6), Sun(0), Mon(1) should be valid

    // Split into two parts: days before Sunday and days from Sunday onwards
    const sundayIndex = dayNumbers.indexOf(0);

    // If Sunday is at the beginning, it might be part of a wrap
    if (sundayIndex === 0) {
      // Check if remaining days are contiguous and end with Saturday
      const remainingDays = dayNumbers.slice(1);
      if (remainingDays[remainingDays.length - 1] === 6) {
        // Check if the middle days are contiguous
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

// Check minimum nights requirement
export const checkMinimumNights = (
  selectedDays: Day[],
  minimumNights: number
): boolean => {
  const nights = selectedDays.length - 1;
  return nights >= minimumNights;
};

// Check maximum nights constraint
export const checkMaximumNights = (
  selectedDays: Day[],
  maximumNights: number | null
): boolean => {
  if (maximumNights === null) return true;
  const nights = selectedDays.length - 1;
  return nights <= maximumNights;
};

// Check if date is blocked
export const isDateBlocked = (date: Date, blockedDates: Date[]): boolean => {
  return blockedDates.some(blocked =>
    blocked.getTime() === date.getTime()
  );
};

// Check if date is within available range
export const isDateInRange = (
  date: Date,
  firstAvailable: Date,
  lastAvailable: Date
): boolean => {
  return date >= firstAvailable && date <= lastAvailable;
};
