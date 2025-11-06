import { Listing } from '../types';

export const getMockListing = (): Listing => {
  return {
    id: 'mock-listing-1',
    firstAvailable: new Date(),
    lastAvailable: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    numberOfNightsAvailable: 7,
    active: true,
    approved: true,
    datesBlocked: [],
    complete: true,
    confirmedAvailability: true,
    kitchenType: 'Full Kitchen',
    checkInTime: '2:00 pm',
    checkOutTime: '11:00 am',
    nightsAvailableList: [],
    nightsAvailableNumbers: [0, 1, 2, 3, 4, 5, 6],
    nightsNotAvailable: [],
    pricingList: {
      combinedMarkup: 15,
      fullTimeDiscount: 10,
      hostCompensation: [100, 200, 300, 400, 500],
      markupAndDiscountMultiplier: [1.0, 0.95, 0.9, 0.85, 0.8],
      nightlyPrice: [100, 95, 90, 85, 80, 75, 70],
      numberSelectedNights: [1, 2, 3, 4, 5, 6, 7],
      overallSiteMarkup: 5,
      slope: 0,
      startingNightlyPrice: 100,
      unitMarkup: 0,
      unusedNights: [],
      unusedNightsDiscount: [],
      weeklyPriceAdjust: 0
    },
    minimumNights: 2,
    maximumNights: 7,
    daysAvailable: [0, 1, 2, 3, 4, 5, 6],
    daysNotAvailable: []
  };
};
