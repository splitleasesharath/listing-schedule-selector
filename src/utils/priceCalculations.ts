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
    // Step 1: Monthly avg nightly price = Monthly Host Rate / Average Days Per Month
    const monthlyRate = getMonthlyRate(listing);
    const monthlyAvgNightlyPrice = monthlyRate / zatConfig.averageDaysPerMonth;
    console.log('  📅 Monthly avg nightly price: $', monthlyRate, '/', zatConfig.averageDaysPerMonth, '= $', monthlyAvgNightlyPrice);

    // Step 2: Average weekly price = Monthly avg nightly price × 7
    const avgWeeklyPrice = monthlyAvgNightlyPrice * 7;
    console.log('  📅 Average weekly price: $', monthlyAvgNightlyPrice, '× 7 = $', avgWeeklyPrice);

    // Step 3: Prorated nightly price = Average weekly price / Selected nights count
    nightlyHostRate = avgWeeklyPrice / nightsCount;
    console.log('  📅 Prorated nightly price: $', avgWeeklyPrice, '/', nightsCount, '= $', nightlyHostRate, '/night');
  } else if (listing.rentalType === 'Weekly') {
    // Calculate weekly rental prorated nightly host rate
    // Similar to Monthly: Weekly Rate / Selected Nights Count
    const weeklyRate = getWeeklyRate(listing);
    nightlyHostRate = weeklyRate / nightsCount;
    console.log('  📅 Weekly rental: $', weeklyRate, '/', nightsCount, 'nights = $', nightlyHostRate, '/night');
  } else {
    // Nightly rental - use rate based on number of nights selected
    nightlyHostRate = getNightlyRateForNights(nightsCount, listing);
    console.log('  🌙 Nightly rental: $', nightlyHostRate, '/night for', nightsCount, 'nights');
  }

  // Step 2: Calculate base price and apply markups/discounts based on rental type
  let basePrice = nightlyHostRate * nightsCount;
  let totalDiscount = 0;
  let totalMarkup = 0;

  if (listing.rentalType === 'Monthly' || listing.rentalType === 'Weekly') {
    // Monthly/Weekly rental: Use special markup/discount multiplier formula
    // Multiplier = Overall Site Markup + Unit Markup - Unused Nights Discount + 1
    const unusedNights = listing.numberOfNightsAvailable - nightsCount;
    console.log('  Unused nights:', unusedNights, '(', listing.numberOfNightsAvailable, '-', nightsCount, ')');

    const unusedNightsDiscountValue = unusedNights * zatConfig.unusedNightsDiscountMultiplier;
    console.log('  Unused nights discount value:', unusedNightsDiscountValue, '(', unusedNights, '×', zatConfig.unusedNightsDiscountMultiplier, ')');

    const unitMarkup = listing.unitMarkup || 0;
    console.log('  Unit markup:', unitMarkup);

    // For Weekly rentals, include Weekly Markup in the multiplier
    const weeklyMarkup = listing.rentalType === 'Weekly' ? zatConfig.weeklyPriceAdjust : 0;
    console.log('  Weekly markup:', weeklyMarkup);

    const markupDiscountMultiplier = zatConfig.overallSiteMarkup + unitMarkup - unusedNightsDiscountValue + weeklyMarkup + 1;
    console.log('  📊 Markup & Discount Multiplier:', markupDiscountMultiplier, '(', zatConfig.overallSiteMarkup, '+', unitMarkup, '-', unusedNightsDiscountValue, '+', weeklyMarkup, '+ 1)');

    // Final price = Prorated nightly price × nights × multiplier
    const totalPrice = nightlyHostRate * nightsCount * markupDiscountMultiplier;
    console.log('  💵 Total price for', listing.rentalType, ':', totalPrice, '(', nightlyHostRate, '×', nightsCount, '×', markupDiscountMultiplier, ')');

    // Calculate weekly schedule period
    const weeksOffered = listing.weeksOffered || 'Every Week';
    let weeklySchedulePeriod = 1;
    const weeksOfferedLower = weeksOffered.toLowerCase();

    if (weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('one week off') ||
        weeksOfferedLower.includes('1 on 1 off') || weeksOfferedLower.includes('1on1off') ||
        weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('1 week off')) {
      weeklySchedulePeriod = 2;
    } else if (weeksOfferedLower.includes('two week') && weeksOfferedLower.includes('two week') ||
               weeksOfferedLower.includes('2 on 2 off') || weeksOfferedLower.includes('2on2off') ||
               weeksOfferedLower.includes('2 week on') && weeksOfferedLower.includes('2 week off')) {
      weeklySchedulePeriod = 2;
    } else if (weeksOfferedLower.includes('1 on 3 off') || weeksOfferedLower.includes('1on3off') ||
               weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('three week') ||
               weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('3 week off')) {
      weeklySchedulePeriod = 4;
    }
    console.log('  📅 Weekly schedule period:', weeklySchedulePeriod, '(', weeksOffered, ')');

    // 4-week rent = nightly price × nights selected × 4 / period
    const pricePerNight = totalPrice / nightsCount;
    const fourWeekRent = (pricePerNight * nightsCount * 4) / weeklySchedulePeriod;
    console.log('  💰 4-week rent:', fourWeekRent, '(', pricePerNight, '×', nightsCount, '× 4 ) /', weeklySchedulePeriod, ')');
    console.log('    Breakdown: total price per week:', totalPrice, ', × 4 weeks /', weeklySchedulePeriod, '=', (totalPrice * 4) / weeklySchedulePeriod);

    // Initial payment = 4-week rent + cleaning + deposit
    const initialPayment = fourWeekRent + (listing.cleaningCost || 0) + (listing.damageDeposit || 0);
    console.log('  💳 Initial payment:', initialPayment);

    // Total reservation price
    const totalReservationPrice = calculateTotalReservationPrice(
      totalPrice,
      nightsCount,
      reservationSpanWeeks,
      weeksOffered
    );

    return {
      basePrice: nightlyHostRate * nightsCount,
      nightlyRate: nightlyHostRate,
      discountAmount: unusedNightsDiscountValue * (nightlyHostRate * nightsCount),
      markupAmount: (zatConfig.overallSiteMarkup + unitMarkup) * (nightlyHostRate * nightsCount),
      totalPrice,
      pricePerNight,
      numberOfNights: nightsCount,
      fourWeekRent,
      initialPayment,
      totalReservationPrice
    };
  }

  // For Nightly rentals, use the original logic
  console.log('  💵 Base price (before markups/discounts):', basePrice);

  // Step 3: Calculate unused nights discount
  const unusedNights = listing.numberOfNightsAvailable - nightsCount;
  console.log('  Unused nights:', unusedNights, '(', listing.numberOfNightsAvailable, '-', nightsCount, ')');
  console.log('  Rental type for discount check:', listing.rentalType);

  let unusedNightsDiscount = 0;
  // Nightly rentals do NOT get unused nights discount (Monthly/Weekly handled above)
  console.log('  ⏭️ Skipping unused nights discount for Nightly rental type');

  // Step 4: Calculate full-time discount (7 nights)
  let fullTimeDiscount = 0;
  if (nightsCount === 7) {
    fullTimeDiscount = basePrice * zatConfig.fullTimeDiscount;
    console.log('  🎉 Full-time discount (7 nights):', fullTimeDiscount, '(', zatConfig.fullTimeDiscount * 100, '%)');
  }

  // Total discounts
  totalDiscount = unusedNightsDiscount + fullTimeDiscount;
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

  totalMarkup = siteMarkup + weeklyAdjust;
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

// Mapping of reservation span weeks to "4 weeks per Period (rent cycle)" values from Bubble option set
const RESERVATION_SPAN_PERIODS: Record<number, number> = {
  6: 1.5,
  7: 1.75,
  8: 2,
  9: 2.25,
  10: 2.5,
  12: 3,
  13: 3.25,
  16: 4,
  17: 4.25,
  20: 5,
  22: 5.5,
  26: 6.5
};

// Calculate total reservation price based on reservation span and weekly pattern
// Following Bubble's "Create reservation span variables" custom event logic
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

  // Step 1: Calculate "Actual Weeks During 4 Week" based on weekly pattern
  // This represents how many weeks you're actually using out of a 4-week period
  const weeksOfferedLower = weeksOffered.toLowerCase();
  let actualWeeksDuring4Week = 4; // Default for "Every Week"

  if (weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('one week off') ||
      weeksOfferedLower.includes('1 on 1 off') || weeksOfferedLower.includes('1on1off') ||
      weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('1 week off')) {
    actualWeeksDuring4Week = 2; // 1 on 1 off = 2 weeks used per 4-week period
  } else if (weeksOfferedLower.includes('two week') && weeksOfferedLower.includes('two week') ||
             weeksOfferedLower.includes('2 on 2 off') || weeksOfferedLower.includes('2on2off') ||
             weeksOfferedLower.includes('2 week on') && weeksOfferedLower.includes('2 week off')) {
    actualWeeksDuring4Week = 2; // 2 on 2 off = 2 weeks used per 4-week period
  } else if (weeksOfferedLower.includes('1 on 3 off') || weeksOfferedLower.includes('1on3off') ||
             weeksOfferedLower.includes('one week on') && weeksOfferedLower.includes('three week') ||
             weeksOfferedLower.includes('1 week on') && weeksOfferedLower.includes('3 week off')) {
    actualWeeksDuring4Week = 1; // 1 on 3 off = 1 week used per 4-week period
  }

  console.log('    - Actual weeks during 4-week period:', actualWeeksDuring4Week);

  // Step 2: Get "4 weeks per Period (rent cycle)" from reservation span option set
  const fourWeeksPerPeriod = RESERVATION_SPAN_PERIODS[reservationSpanWeeks] || (reservationSpanWeeks / 4);
  console.log('    - 4 weeks per period (from option set):', fourWeeksPerPeriod);

  // Step 3: Calculate "Actual Weeks During Reservation Span"
  // Formula from Bubble: Actual Weeks During 4 Week × 4 weeks per Period :ceiling
  const actualWeeksDuringReservationSpan = Math.ceil(actualWeeksDuring4Week * fourWeeksPerPeriod);
  console.log('    - Actual weeks during reservation span:', actualWeeksDuringReservationSpan, '(', actualWeeksDuring4Week, '×', fourWeeksPerPeriod, ':ceiling)');

  // Step 4: Calculate total reservation price
  // Formula: Nightly Price × Nights Selected × Actual Weeks During Reservation Span
  const nightlyPrice = weeklyPrice / nightsSelected;
  const totalReservation = nightlyPrice * nightsSelected * actualWeeksDuringReservationSpan;

  console.log('    - Nightly price:', nightlyPrice, '(', weeklyPrice, '/', nightsSelected, ')');
  console.log('    - Total reservation:', totalReservation, '(', nightlyPrice, '×', nightsSelected, '×', actualWeeksDuringReservationSpan, ')');

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
