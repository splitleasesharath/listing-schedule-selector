import { Day, Listing } from '../types';
import { sortDays } from './dayHelpers';

export const validateDaySelection = (
  day: Day,
  selectedDays: Day[],
  listing: Listing
): { isValid: boolean; error?: string } => {
  console.log('🔍 Validating day selection:', {
    dayOfWeek: day.dayOfWeek,
    dayName: day.name,
    listingDaysAvailable: listing.daysAvailable,
    isDayInAvailableList: listing.daysAvailable.includes(day.dayOfWeek)
  });

  if (selectedDays.some(d => d.dayOfWeek === day.dayOfWeek)) {
    console.log('❌ Day already selected');
    return { isValid: false, error: 'Day already selected' };
  }
  if (selectedDays.length >= 7) {
    console.log('❌ Maximum 7 days reached');
    return { isValid: false, error: 'Maximum 7 days can be selected' };
  }
  if (!listing.daysAvailable.includes(day.dayOfWeek)) {
    console.log('❌ Day not in listing.daysAvailable array');
    return { isValid: false, error: 'Day not available for this listing' };
  }
  if (!day.isAvailable) {
    console.log('❌ day.isAvailable is false');
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

  console.log('🔍 Checking contiguity (Bubble logic) for days:', dayNumbers);

  // Calculate NOT selected days
  const allDays = [0, 1, 2, 3, 4, 5, 6];
  const notSelectedDays = allDays.filter(d => !dayNumbers.includes(d));

  console.log('  Not selected days:', notSelectedDays);

  // Bubble Logic 1: If 6+ days selected, automatically contiguous
  if (dayNumbers.length >= 6) {
    console.log('✅ 6+ days selected - automatically contiguous');
    return true;
  }

  // Bubble Logic 2: If NOT selected days >= 6 (only 1 day selected), need more nights
  if (notSelectedDays.length >= 6) {
    console.log('❌ Only 1 day selected - need more nights');
    return false;
  }

  // Check if both Sunday (0) AND Saturday (6) are selected
  const hasSunday = dayNumbers.includes(0);
  const hasSaturday = dayNumbers.includes(6);

  if (hasSunday && hasSaturday) {
    // Bubble's clever logic: Check if the GAP (not selected days) is contiguous
    // If the gap is contiguous, then selected days wrap around correctly!
    console.log('🔄 Week wrap-around case: checking if NOT selected days are contiguous...');

    if (notSelectedDays.length === 0) {
      console.log('✅ All days selected');
      return true;
    }

    // Check if not selected days form a contiguous block
    const gapContiguous = checkDaysContiguous(notSelectedDays);
    console.log(gapContiguous ? '✅ Gap is contiguous = selection wraps correctly' : '❌ Gap has breaks = invalid wrap');
    return gapContiguous;
  }

  // Normal case: check if selected days are contiguous
  console.log('📅 Normal case: checking if selected days are contiguous...');
  const result = checkDaysContiguous(dayNumbers);
  console.log(result ? '✅ Contiguous' : '❌ Not contiguous');
  return result;
};

// Helper function to check if an array of day numbers is contiguous
function checkDaysContiguous(dayNumbers: number[]): boolean {
  if (dayNumbers.length === 0) return true;
  if (dayNumbers.length === 1) return true;

  const sorted = [...dayNumbers].sort((a, b) => a - b);
  const minIndex = Math.min(...sorted);
  const maxIndex = Math.max(...sorted);

  // Create expected sequence from min to max
  const expectedSequence = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    expectedSequence.push(i);
  }

  // Check if sorted days match expected sequence
  return expectedSequence.every((day, index) => day === sorted[index]);
}
