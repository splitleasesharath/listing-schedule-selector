import { Listing, Night, PriceBreakdown } from '../types';

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
  const nightlyRate = getNightlyRateForNights(nightsCount, pricingList);
  const basePrice = nightlyRate * nightsCount;
  const discountAmount = calculateDiscounts(basePrice, nightsCount, pricingList);
  const markupAmount = calculateMarkups(basePrice, pricingList);
  const totalPrice = basePrice - discountAmount + markupAmount;
  const pricePerNight = totalPrice / nightsCount;

  return {
    basePrice,
    nightlyRate,
    discountAmount,
    markupAmount,
    totalPrice,
    pricePerNight,
    numberOfNights: nightsCount
  };
};

function getNightlyRateForNights(nightsCount: number, pricingList: any): number {
  const index = pricingList.numberSelectedNights.indexOf(nightsCount);
  if (index !== -1 && pricingList.nightlyPrice[index] !== undefined) {
    return pricingList.nightlyPrice[index];
  }
  return pricingList.startingNightlyPrice || 0;
}

function calculateDiscounts(basePrice: number, nightsCount: number, pricingList: any): number {
  let totalDiscount = 0;
  if (pricingList.fullTimeDiscount) {
    totalDiscount += (basePrice * pricingList.fullTimeDiscount) / 100;
  }
  return totalDiscount;
}

function calculateMarkups(basePrice: number, pricingList: any): number {
  let totalMarkup = 0;
  if (pricingList.combinedMarkup) {
    totalMarkup += (basePrice * pricingList.combinedMarkup) / 100;
  }
  if (pricingList.overallSiteMarkup) {
    totalMarkup += (basePrice * pricingList.overallSiteMarkup) / 100;
  }
  return totalMarkup;
}
