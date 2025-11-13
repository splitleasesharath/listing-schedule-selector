import { Listing, Night, PriceBreakdown, PricingList } from '../types';

// Calculate price based on selected nights and listing
export const calculatePrice = (
  selectedNights: Night[],
  listing: Listing
): PriceBreakdown => {
  const nightsCount = selectedNights.length;

  if (nightsCount === 0) {
    return {
      basePrice: 0,
      nightlyRate: 0,
      discountAmount: 0,
      markupAmount: 0,
      totalPrice: 0,
      pricePerNight: 0,
      numberOfNights: 0
    };
  }

  const pricingList = listing.pricingList;

  // Get nightly rate based on number of nights selected
  const nightlyRate = getNightlyRateForNights(nightsCount, pricingList);

  // Calculate base price
  const basePrice = nightlyRate * nightsCount;

  // Apply discounts
  const discountAmount = calculateDiscounts(basePrice, nightsCount, pricingList);

  // Apply markups
  const markupAmount = calculateMarkups(basePrice, pricingList);

  // Calculate final total
  const totalPrice = basePrice - discountAmount + markupAmount;
  const pricePerNight = totalPrice / nightsCount;

  // Calculate 4-week rent if applicable
  const fourWeekRent = calculate4WeekRent(nightsCount, nightlyRate, pricingList);

  // Calculate initial payment
  const initialPayment = calculateInitialPayment(totalPrice, fourWeekRent);

  return {
    basePrice,
    nightlyRate,
    discountAmount,
    markupAmount,
    totalPrice,
    pricePerNight,
    numberOfNights: nightsCount,
    fourWeekRent,
    initialPayment
  };
};

// Get nightly rate based on number of nights (from pricing list)
const getNightlyRateForNights = (
  nightsCount: number,
  pricingList: PricingList
): number => {
  // Check if there's a specific rate for this number of nights
  const index = pricingList.numberSelectedNights.indexOf(nightsCount);

  if (index !== -1 && pricingList.nightlyPrice[index] !== undefined) {
    return pricingList.nightlyPrice[index];
  }

  // Fall back to starting nightly price
  return pricingList.startingNightlyPrice || 0;
};

// Calculate discounts based on pricing list
const calculateDiscounts = (
  basePrice: number,
  nightsCount: number,
  pricingList: PricingList
): number => {
  let totalDiscount = 0;

  // Apply full-time discount if applicable
  if (pricingList.fullTimeDiscount) {
    totalDiscount += (basePrice * pricingList.fullTimeDiscount) / 100;
  }

  // Apply unused nights discount if applicable
  const unusedNightsCount = (pricingList.unusedNights || []).length;
  if (unusedNightsCount > 0 && pricingList.unusedNightsDiscount) {
    const unusedDiscountIndex = pricingList.unusedNightsDiscount.findIndex(
      (_, index) => index === unusedNightsCount
    );
    if (unusedDiscountIndex !== -1) {
      totalDiscount += pricingList.unusedNightsDiscount[unusedDiscountIndex] || 0;
    }
  }

  return totalDiscount;
};

// Calculate markups based on pricing list
const calculateMarkups = (
  basePrice: number,
  pricingList: PricingList
): number => {
  let totalMarkup = 0;

  // Apply combined markup
  if (pricingList.combinedMarkup) {
    totalMarkup += (basePrice * pricingList.combinedMarkup) / 100;
  }

  // Apply overall site markup
  if (pricingList.overallSiteMarkup) {
    totalMarkup += (basePrice * pricingList.overallSiteMarkup) / 100;
  }

  // Apply unit markup
  if (pricingList.unitMarkup) {
    totalMarkup += (basePrice * pricingList.unitMarkup) / 100;
  }

  return totalMarkup;
};

// Calculate 4-week rent
const calculate4WeekRent = (
  nightsCount: number,
  nightlyRate: number,
  pricingList: PricingList
): number => {
  // 4 weeks = 28 nights
  const fourWeekNights = 28;

  // If rental type is monthly, use prorated calculation
  if (nightsCount >= fourWeekNights) {
    return nightlyRate * fourWeekNights;
  }

  return 0;
};

// Calculate initial payment
const calculateInitialPayment = (
  totalPrice: number,
  fourWeekRent?: number
): number => {
  // Initial payment is typically the total price or first month's rent
  return fourWeekRent || totalPrice;
};

// Calculate price multiplier based on rental type
export const calculatePriceMultiplier = (
  rentalType: string | undefined,
  nightsCount: number,
  pricingList: PricingList
): number => {
  // Get multiplier from markup and discount multiplier list
  const index = pricingList.numberSelectedNights.indexOf(nightsCount);

  if (index !== -1 && pricingList.markupAndDiscountMultiplier[index] !== undefined) {
    return pricingList.markupAndDiscountMultiplier[index];
  }

  return 1.0; // Default multiplier
};

// Calculate unused nights discount value
export const calculateUnusedNightsDiscount = (
  availableNights: number,
  selectedNights: number,
  pricingList: PricingList
): number => {
  const unusedNights = availableNights - selectedNights;

  if (unusedNights <= 0) return 0;

  // Find discount for this number of unused nights
  if (pricingList.unusedNightsDiscount && pricingList.unusedNightsDiscount[unusedNights]) {
    return pricingList.unusedNightsDiscount[unusedNights];
  }

  return 0;
};

// Calculate prorated monthly rate to nightly
export const calculateMonthlyToNightly = (monthlyPrice: number): number => {
  // Approximate 30 days in a month
  return monthlyPrice / 30;
};

// Calculate prorated weekly rate to nightly
export const calculateWeeklyToNightly = (weeklyPrice: number): number => {
  return weeklyPrice / 7;
};

// Apply slope adjustment to pricing
export const applySlopeAdjustment = (
  basePrice: number,
  nightsCount: number,
  slope: number
): number => {
  return basePrice + (slope * nightsCount);
};
