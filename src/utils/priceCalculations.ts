import { Listing, Night, PriceBreakdown, ZATPriceConfiguration } from '../types';

export const calculatePrice = (
  selectedNights: Night[],
  listing: Listing,
  zatConfig: ZATPriceConfiguration,
  reservationSpanWeeks: number
): PriceBreakdown => {
  const nightsCount = selectedNights.length;

  console.log('💰 Calculating price for', nightsCount, 'nights');
  console.log('  Rental type:', listing.rentalType);
  console.log('  Listing pricing data:', listing.pricingList);
  console.log('  ZAT Config:', zatConfig);
  console.log('  Reservation span (weeks):', reservationSpanWeeks);

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

  // Step 1: Get base nightly host rate based on rental type
  let nightlyHostRate = 0;

  if (listing.rentalType === 'Monthly') {
    // Calculate monthly rental prorated nightly host rate
    const monthlyRate = getMonthlyRate(listing);
    nightlyHostRate = monthlyRate / zatConfig.averageDaysPerMonth;
    console.log('  📅 Monthly rental: $', monthlyRate, '/', zatConfig.averageDaysPerMonth, 'days = $', nightlyHostRate, '/night');
  } else if (listing.rentalType === 'Weekly') {
    // Calculate weekly rental prorated nightly host rate
    const weeklyRate = getWeeklyRate(listing);
    nightlyHostRate = weeklyRate / 7;
    console.log('  📅 Weekly rental: $', weeklyRate, '/ 7 days = $', nightlyHostRate, '/night');
  } else {
    // Nightly rental - use rate based on number of nights selected
    nightlyHostRate = getNightlyRateForNights(nightsCount, listing);
    console.log('  🌙 Nightly rental: $', nightlyHostRate, '/night for', nightsCount, 'nights');
  }

  // Step 2: Calculate base price (nightly rate × nights)
  const basePrice = nightlyHostRate * nightsCount;
  console.log('  💵 Base price (before markups/discounts):', basePrice);

  // Step 3: Calculate unused nights discount
  const unusedNights = listing.numberOfNightsAvailable - nightsCount;
  console.log('  Unused nights:', unusedNights, '(', listing.numberOfNightsAvailable, '-', nightsCount, ')');
  console.log('  Rental type for discount check:', listing.rentalType);

  let unusedNightsDiscount = 0;
  // Only apply unused nights discount for Monthly and Weekly rentals, NOT Nightly
  if (unusedNights > 0 && (listing.rentalType === 'Monthly' || listing.rentalType === 'Weekly')) {
    // Apply unused nights discount (based on Bubble logic: unused nights × discount multiplier)
    unusedNightsDiscount = unusedNights * zatConfig.unusedNightsDiscountMultiplier * basePrice;
    console.log('  🎁 Unused nights discount:', unusedNightsDiscount, '(', unusedNights, '×', zatConfig.unusedNightsDiscountMultiplier, '× base)');
  } else if (listing.rentalType === 'Nightly') {
    console.log('  ⏭️ Skipping unused nights discount for Nightly rental type');
  }

  // Step 4: Calculate full-time discount (7 nights)
  let fullTimeDiscount = 0;
  if (nightsCount === 7) {
    fullTimeDiscount = basePrice * zatConfig.fullTimeDiscount;
    console.log('  🎉 Full-time discount (7 nights):', fullTimeDiscount, '(', zatConfig.fullTimeDiscount * 100, '%)');
  }

  // Total discounts
  const totalDiscount = unusedNightsDiscount + fullTimeDiscount;
  console.log('  💲 Total discounts:', totalDiscount);

  // Step 5: Calculate markups
  // Apply overall site markup
  const priceAfterDiscounts = basePrice - totalDiscount;
  const siteMarkup = priceAfterDiscounts * zatConfig.overallSiteMarkup;
  console.log('  📈 Site markup:', siteMarkup, '(', zatConfig.overallSiteMarkup * 100, '% of', priceAfterDiscounts, ')');

  // Apply weekly price adjust if Weekly rental type
  let weeklyAdjust = 0;
  if (listing.rentalType === 'Weekly' && zatConfig.weeklyPriceAdjust !== 0) {
    weeklyAdjust = priceAfterDiscounts * zatConfig.weeklyPriceAdjust;
    console.log('  📊 Weekly price adjust:', weeklyAdjust, '(', zatConfig.weeklyPriceAdjust * 100, '%)');
  }

  const totalMarkup = siteMarkup + weeklyAdjust;
  console.log('  💰 Total markups:', totalMarkup);

  // Step 6: Calculate final total price
  const totalPrice = basePrice - totalDiscount + totalMarkup;
  const pricePerNight = totalPrice / nightsCount;

  console.log('  ✅ FINAL PRICE:', totalPrice, '($', pricePerNight, '/night)');

  // Step 7: Calculate 4-week rent
  // 4-week rent = nightlyPrice × nightsSelected × 4
  const fourWeekRent = pricePerNight * nightsCount * 4;
  console.log('  📅 4-week rent:', fourWeekRent, '(', pricePerNight, '×', nightsCount, '× 4)');

  // Step 8: Calculate initial payment (first month rent)
  // Initial payment = 4-week rent + cleaning cost + damage deposit
  const cleaningCost = listing.cleaningCost || 0;
  const damageDeposit = listing.damageDeposit || 0;
  const initialPayment = fourWeekRent + cleaningCost + damageDeposit;
  console.log('  💳 Initial payment:', initialPayment, '(', fourWeekRent, '+', cleaningCost, '+', damageDeposit, ')');

  // Step 9: Calculate total reservation price based on reservation span and weekly pattern
  const totalReservationPrice = calculateTotalReservationPrice(
    totalPrice,
    nightsCount,
    reservationSpanWeeks,
    listing.weeksOffered || 'Every Week'
  );
  console.log('  🏠 Total reservation price:', totalReservationPrice);

  return {
    basePrice,
    nightlyRate: nightlyHostRate,
    discountAmount: totalDiscount,
    markupAmount: totalMarkup,
    totalPrice,
    pricePerNight,
    numberOfNights: nightsCount,
    fourWeekRent,
    initialPayment,
    totalReservationPrice
  };
};

// Calculate total reservation price based on reservation span and weekly pattern
function calculateTotalReservationPrice(
  weeklyPrice: number,
  nightsSelected: number,
  reservationSpanWeeks: number,
  weeksOffered: string
): number {
  console.log('  🔢 Calculating total reservation...');
  console.log('    - Weekly price:', weeklyPrice);
  console.log('    - Nights selected:', nightsSelected);
  console.log('    - Reservation span (weeks):', reservationSpanWeeks);
  console.log('    - Weeks offered pattern:', weeksOffered);

  // Parse the weekly pattern and get schedule period
  // Options: "Every Week" (period 1), "1 on 1 off" (period 2), "2 on 2 off" (period 2), "1 on 3 off" (period 4)
  let weeklySchedulePeriod = 1;

  if (weeksOffered.includes('1 on 1 off') || weeksOffered.includes('1on1off')) {
    weeklySchedulePeriod = 2;
  } else if (weeksOffered.includes('2 on 2 off') || weeksOffered.includes('2on2off')) {
    weeklySchedulePeriod = 2;
  } else if (weeksOffered.includes('1 on 3 off') || weeksOffered.includes('1on3off')) {
    weeklySchedulePeriod = 4;
  }
  // Default "Every Week": period = 1

  console.log('    - Weekly schedule period:', weeklySchedulePeriod);

  // Formula: weeksSelected × nightsSelected × nightlyPrice / weeklySchedulePeriod
  const nightlyPrice = weeklyPrice / nightsSelected;
  const totalReservation = (reservationSpanWeeks * nightsSelected * nightlyPrice) / weeklySchedulePeriod;

  console.log('    - Nightly price:', nightlyPrice, '(', weeklyPrice, '/', nightsSelected, ')');
  console.log('    - Calculation:', reservationSpanWeeks, '×', nightsSelected, '×', nightlyPrice, '/', weeklySchedulePeriod, '=', totalReservation);

  return totalReservation;
}

// Get monthly rate from listing
function getMonthlyRate(listing: Listing): number {
  return listing.monthlyHostRate || 0;
}

// Get weekly rate from listing
function getWeeklyRate(listing: Listing): number {
  return listing.weeklyHostRate || 0;
}

// Get nightly rate based on number of nights
function getNightlyRateForNights(nightsCount: number, listing: Listing): number {
  const pricingList = listing.pricingList;

  if (!pricingList) {
    console.warn('  ⚠️ No pricing list found for listing');
    return 0;
  }

  // Try to find exact match in nightly price array
  if (pricingList.numberSelectedNights && Array.isArray(pricingList.numberSelectedNights)) {
    const index = pricingList.numberSelectedNights.indexOf(nightsCount);
    if (index !== -1 && pricingList.nightlyPrice && pricingList.nightlyPrice[index] !== undefined) {
      console.log('  Found exact rate for', nightsCount, 'nights:', pricingList.nightlyPrice[index]);
      return pricingList.nightlyPrice[index];
    }
  }

  // Fallback: find closest available rate
  if (pricingList.numberSelectedNights && pricingList.nightlyPrice) {
    // Find the closest available rate for nights less than or equal to selected
    let closestNights = 0;
    let closestRate = pricingList.startingNightlyPrice || 0;

    for (let i = 0; i < pricingList.numberSelectedNights.length; i++) {
      const availableNights = pricingList.numberSelectedNights[i];
      if (availableNights <= nightsCount && availableNights > closestNights) {
        closestNights = availableNights;
        closestRate = pricingList.nightlyPrice[i];
      }
    }

    if (closestNights > 0) {
      console.log('  Using closest rate for', closestNights, 'nights:', closestRate);
      return closestRate;
    }
  }

  // Final fallback to starting nightly price
  const fallbackRate = pricingList.startingNightlyPrice || 0;
  console.log('  Using fallback starting rate:', fallbackRate);
  return fallbackRate;
}
