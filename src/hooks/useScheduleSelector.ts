import { useState, useCallback, useMemo } from 'react';
import { Day, Listing, Night, PriceBreakdown, ErrorState, ZATPriceConfiguration } from '../types';
import { validateDaySelection, validateDayRemoval, isContiguous } from '../utils/validators';
import { calculateNightsFromDays, calculateCheckInCheckOut, countSelectedNights } from '../utils/nightCalculations';
import { calculatePrice } from '../utils/priceCalculations';
import { sortDays, getNotSelectedDays, createAllDays, getUnusedNights, createNightsFromDays } from '../utils/dayHelpers';

// Default ZAT configuration
const DEFAULT_ZAT_CONFIG: ZATPriceConfiguration = {
  unusedNightsDiscountMultiplier: 0.03,
  weeklyPriceAdjust: 0,
  overallSiteMarkup: 0.17,
  averageDaysPerMonth: 31,
  fullTimeDiscount: 0.13
};

interface UseScheduleSelectorProps {
  listing: Listing;
  initialSelectedDays?: Day[];
  limitToFiveNights?: boolean;
  zatConfig?: ZATPriceConfiguration;
  reservationSpanWeeks?: number;
}

export const useScheduleSelector = ({
  listing,
  initialSelectedDays = [],
  limitToFiveNights = false,
  zatConfig = DEFAULT_ZAT_CONFIG,
  reservationSpanWeeks = 13
}: UseScheduleSelectorProps) => {
  const [selectedDays, setSelectedDays] = useState<Day[]>(initialSelectedDays);
  const [errorState, setErrorState] = useState<ErrorState>({
    hasError: false,
    errorType: null,
    errorMessage: ''
  });
  const [isClickable, setIsClickable] = useState(true);
  const [acceptableSchedule, setAcceptableSchedule] = useState(false);

  const allDays = useMemo(() => {
    return createAllDays(listing.daysAvailable);
  }, [listing.daysAvailable]);

  const selectedNights = useMemo(() => {
    return calculateNightsFromDays(selectedDays);
  }, [selectedDays]);

  const notSelectedDays = useMemo(() => {
    return getNotSelectedDays(allDays, selectedDays);
  }, [allDays, selectedDays]);

  const { checkIn, checkOut } = useMemo(() => {
    return calculateCheckInCheckOut(selectedDays);
  }, [selectedDays]);

  const nightsCount = useMemo(() => {
    return countSelectedNights(selectedDays);
  }, [selectedDays]);

  const isSelectionContiguous = useMemo(() => {
    return isContiguous(selectedDays);
  }, [selectedDays]);

  const priceBreakdown = useMemo(() => {
    return calculatePrice(selectedNights, listing, zatConfig, reservationSpanWeeks);
  }, [selectedNights, listing, zatConfig, reservationSpanWeeks]);

  const unusedNights = useMemo(() => {
    const allNights = createNightsFromDays(allDays);
    return getUnusedNights(allNights, selectedNights);
  }, [allDays, selectedNights]);

  const handleDaySelect = useCallback((day: Day): boolean => {
    if (!isClickable) return false;
    const maxNights = limitToFiveNights ? 5 : listing.maximumNights;
    const listingWithLimit = { ...listing, maximumNights: maxNights };
    const validation = validateDaySelection(day, selectedDays, listingWithLimit);
    if (!validation.isValid) {
      setErrorState({
        hasError: true,
        errorType: 'availability',
        errorMessage: validation.error || 'Cannot select this day'
      });
      return false;
    }
    const newSelection = sortDays([...selectedDays, day]);
    setSelectedDays(newSelection);
    setErrorState({ hasError: false, errorType: null, errorMessage: '' });
    return true;
  }, [selectedDays, listing, isClickable, limitToFiveNights]);

  const handleDayRemove = useCallback((day: Day): boolean => {
    if (!isClickable) return false;
    const validation = validateDayRemoval(day, selectedDays, listing.minimumNights);
    if (!validation.isValid) {
      setErrorState({
        hasError: true,
        errorType: 'minimum_nights',
        errorMessage: validation.error || 'Cannot remove this day'
      });
      return false;
    }
    const newSelection = selectedDays.filter(d => d.dayOfWeek !== day.dayOfWeek);
    setSelectedDays(newSelection);
    setErrorState({ hasError: false, errorType: null, errorMessage: '' });
    return true;
  }, [selectedDays, listing.minimumNights, isClickable]);

  const handleDayClick = useCallback((day: Day): boolean => {
    const isSelected = selectedDays.some(d => d.dayOfWeek === day.dayOfWeek);
    if (isSelected) {
      return handleDayRemove(day);
    } else {
      return handleDaySelect(day);
    }
  }, [selectedDays, handleDaySelect, handleDayRemove]);

  const clearSelection = useCallback(() => {
    setSelectedDays([]);
    setErrorState({ hasError: false, errorType: null, errorMessage: '' });
  }, []);

  const clearError = useCallback(() => {
    setErrorState({ hasError: false, errorType: null, errorMessage: '' });
  }, []);

  return {
    selectedDays,
    selectedNights,
    notSelectedDays,
    unusedNights,
    checkInDay: checkIn,
    checkOutDay: checkOut,
    nightsCount,
    priceBreakdown,
    errorState,
    isClickable,
    isContiguous: isSelectionContiguous,
    acceptableSchedule,
    allDays,
    handleDayClick,
    handleDaySelect,
    handleDayRemove,
    clearSelection,
    clearError
  };
};
